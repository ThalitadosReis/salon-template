export default function Label({
  label,
  title,
  body,
  center = false,
  titleSize = "lg",
  as: Tag = "h2",
}) {
  const align = center ? "text-center" : "";
  const sizeMap = {
    sm: "text-4xl lg:text-5xl",
    lg: "text-5xl lg:text-6xl",
    xl: "text-6xl lg:text-7xl",
  };

  return (
    <div className={align}>
      {label && (
        <p className="text-[10px] tracking-[0.55em] uppercase font-body font-medium text-stone-500 mb-4">
          {label}
        </p>
      )}
      <Tag
        className={`font-display font-light ${sizeMap[titleSize] ?? sizeMap.lg} text-stone-800 leading-[1.08] whitespace-pre-line mb-4`}
      >
        {title}
      </Tag>
      {body && (
        <p
          className={`text-base font-body text-stone-600 leading-[1.8] ${center ? "max-w-md mx-auto" : "max-w-sm"}`}
        >
          {body}
        </p>
      )}
    </div>
  );
}
