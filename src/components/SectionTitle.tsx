interface SectionTitleProps {
  /** Heading text. */
  title: string;
  /** Optional smaller caption rendered below the title. */
  subtitle?: string;
  /** Decorative glyph shown before the title. */
  icon?: string;
}

/** Pixel-font section heading with a decorative icon and divider. */
export function SectionTitle({ title, subtitle, icon = '◆' }: SectionTitleProps) {
  return (
    <header className="mb-8">
      <h2 className="section-title mb-2">
        <span aria-hidden="true" className="text-gold">
          {icon}
        </span>
        {title}
      </h2>
      {subtitle && <p className="text-xl text-teal">{subtitle}</p>}
      <div
        aria-hidden="true"
        className="mt-3 h-1 w-full bg-[repeating-linear-gradient(90deg,rgb(var(--color-border))_0_8px,transparent_8px_12px)]"
      />
    </header>
  );
}
