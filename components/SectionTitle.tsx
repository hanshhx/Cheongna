type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
  size?: "lg" | "md";
};

export default function SectionTitle({
  eyebrow,
  title,
  desc,
  align = "left",
  size = "lg",
}: Props) {
  return (
    <div
      className={`reveal mb-10 md:mb-14 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-[1px] w-10 bg-champagne" />
          <span className="text-champagne-deep text-[0.72rem] tracking-[0.28em] uppercase font-bold">
            {eyebrow}
          </span>
          <span className="h-[1px] w-3 bg-champagne/40" />
        </div>
      )}
      <h2
        className={`h-display ${size === "lg" ? "text-[1.95rem] md:text-[2.6rem]" : "text-[1.55rem] md:text-[1.9rem]"}`}
        style={{ lineHeight: "1.16" }}
      >
        {title}
      </h2>
      {desc && (
        <p className="text-ink-light mt-5 leading-[1.95] text-[0.96rem] max-w-2xl">
          {desc}
        </p>
      )}
    </div>
  );
}
