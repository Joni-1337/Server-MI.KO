export type TextPart = string | { text: string; accent?: "cyan" | "gold" };

interface HighlightedTextProps {
  parts: TextPart[];
}

export function HighlightedText({ parts }: HighlightedTextProps) {
  return (
    <>
      {parts.map((part, index) =>
        typeof part === "string" ? (
          <span key={index}>{part}</span>
        ) : (
          <span
            key={index}
            className={part.accent === "gold" ? "text-accent-gold" : "text-accent-cyan"}
          >
            {part.text}
          </span>
        ),
      )}
    </>
  );
}
