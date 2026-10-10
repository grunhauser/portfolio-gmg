import type { ElementType, ReactNode } from 'react';

interface PixelPanelProps {
  children: ReactNode;
  /** Extra classes for the inner content wrapper (padding, layout…). */
  className?: string;
  /** Optional speaker name rendered as an RPG dialog name tag. */
  speaker?: string;
  /** HTML element to render as. Defaults to `div`. */
  as?: ElementType;
  /** Use the violet accent border instead of the default steel border. */
  accent?: boolean;
}

/**
 * RPG dialog-box panel with a stepped pixel border.
 * Wrap it in an element with the `pixel-card` class to get hover effects.
 */
export function PixelPanel({
  children,
  className = 'p-5 sm:p-6',
  speaker,
  as: Tag = 'div',
  accent = false,
}: PixelPanelProps) {
  return (
    <div className="relative">
      {speaker && (
        <span className="pixel-slot absolute -top-3 left-5 z-10 bg-panel px-3 py-1 font-pixel text-[0.6rem] text-gold sm:text-[0.65rem]">
          {speaker}
        </span>
      )}
      <Tag className={`pixel-panel ${accent ? 'pixel-panel-accent' : ''}`}>
        <div className={className}>{children}</div>
      </Tag>
    </div>
  );
}
