type MaterialSymbolProps = {
  name: string;
  className?: string;
};

export function MaterialSymbol({ name, className }: MaterialSymbolProps) {
  return (
    <span
      className={["material-symbols-outlined leading-none", className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      {name}
    </span>
  );
}
