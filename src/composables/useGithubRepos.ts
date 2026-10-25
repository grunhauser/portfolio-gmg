import { ref } from 'vue';

/** The fields of a GitHub repository that the page shows. */
export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  /** ISO date of the last push. */
  pushedAt: string;
}

/** Shape of one item in the GitHub REST response (only the fields we read). */
interface GithubRepoResponse {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
}

/** Request lifecycle, so the template can show the right state. */
export type LoadState = 'idle' | 'loading' | 'success' | 'error';

/** Give up after this long, so a hanging connection ends in the error state instead of loading forever. */
const REQUEST_TIMEOUT_MS = 8000;

/** Cached responses live for 10 minutes; GitHub allows only 60 anonymous requests per hour. */
const CACHE_TTL_MS = 10 * 60 * 1000;

interface CacheEntry {
  savedAt: number;
  repos: GithubRepo[];
}

/** Reads a fresh cache entry from sessionStorage, or `null` if missing, stale or unreadable. */
function readCache(key: string): GithubRepo[] | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    return Date.now() - entry.savedAt < CACHE_TTL_MS ? entry.repos : null;
  } catch {
    return null;
  }
}

/** Saves repos to sessionStorage. Failing to cache is harmless, so errors are ignored. */
function writeCache(key: string, repos: GithubRepo[]): void {
  try {
    const entry: CacheEntry = { savedAt: Date.now(), repos };
    sessionStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // Storage full or blocked: the next visit simply fetches again.
  }
}

/** Converts the API's snake_case item into the camelCase shape used in the app. */
function toRepo(item: GithubRepoResponse): GithubRepo {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    htmlUrl: item.html_url,
    language: item.language,
    stars: item.stargazers_count,
    pushedAt: item.pushed_at,
  };
}

/**
 * Loads a user's public, non-fork repositories from the GitHub REST API,
 * most recently pushed first.
 *
 * Nothing is requested until `load()` is called, so the component decides
 * when (for example, when the section scrolls into view).
 *
 * @param username - GitHub login, e.g. `grunhauser`.
 */
export function useGithubRepos(username: string) {
  const repos = ref<GithubRepo[]>([]);
  const state = ref<LoadState>('idle');
  const cacheKey = `github-repos:${username}`;

  async function load(): Promise<void> {
    const cached = readCache(cacheKey);
    if (cached) {
      repos.value = cached;
      state.value = 'success';
      return;
    }

    state.value = 'loading';
    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=30`,
        {
          headers: { Accept: 'application/vnd.github+json' },
          // AbortSignal.timeout() cancels the request (and rejects fetch) after the delay.
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        },
      );
      // fetch() only rejects on network errors; HTTP errors (403 rate limit, 404) must be checked.
      if (!response.ok) throw new Error(`GitHub API responded ${response.status}`);

      const data = (await response.json()) as GithubRepoResponse[];
      repos.value = data.filter((item) => !item.fork).map(toRepo);
      writeCache(cacheKey, repos.value);
      state.value = 'success';
    } catch (error) {
      console.error(error);
      state.value = 'error';
    }
  }

  return { repos, state, load };
}
