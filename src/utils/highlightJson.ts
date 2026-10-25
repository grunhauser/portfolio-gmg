/** Kind of a piece of JSON text, used as a CSS class for coloring. */
export type JsonTokenType = 'key' | 'string' | 'punctuation' | 'plain';

export interface JsonToken {
  type: JsonTokenType;
  text: string;
}

/**
 * Matches, in order of priority:
 * 1. a quoted string followed by a colon → an object key
 * 2. any other quoted string → a string value
 * 3. one structural character → punctuation
 * Escaped quotes inside strings (\") are handled by `(?:\\.|[^"\\])*`.
 */
const TOKEN_PATTERN = /("(?:\\.|[^"\\])*")(\s*:)|("(?:\\.|[^"\\])*")|([{}[\],])/g;

/**
 * Splits pretty-printed JSON into colored tokens without using innerHTML,
 * so the output is safe to render with Vue's normal text interpolation.
 * Text between matches (spaces, line breaks, numbers) is kept as `plain`.
 *
 * @param json - Output of `JSON.stringify(value, null, 2)`.
 */
export function highlightJson(json: string): JsonToken[] {
  const tokens: JsonToken[] = [];
  let lastIndex = 0;

  for (const match of json.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) tokens.push({ type: 'plain', text: json.slice(lastIndex, index) });

    const [, key, colon, value, punctuation] = match;
    if (key !== undefined) {
      tokens.push({ type: 'key', text: key }, { type: 'punctuation', text: colon ?? '' });
    } else if (value !== undefined) {
      tokens.push({ type: 'string', text: value });
    } else if (punctuation !== undefined) {
      tokens.push({ type: 'punctuation', text: punctuation });
    }
    lastIndex = index + match[0].length;
  }

  if (lastIndex < json.length) tokens.push({ type: 'plain', text: json.slice(lastIndex) });
  return tokens;
}
