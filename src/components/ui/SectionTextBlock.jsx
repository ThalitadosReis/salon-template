export default function SectionTextBlock({
  label,
  title,
  body,
  labelClassName = "",
  titleClassName = "",
  bodyClassName = "",
}) {
  return (
    <>
      <p
        className={`text-[10px] lg:text-xs tracking-[0.4em] uppercase font-ui text-stone-500 mb-4 ${labelClassName}`}
      >
        {label}
      </p>
      <h2
        className={`font-display text-5xl lg:text-6xl font-light text-stone-900 leading-[1.1] whitespace-pre-line mb-6 ${titleClassName}`}
      >
        {title}
      </h2>
      <p
        className={`text-[15px] lg:text-base font-ui font-light text-stone-600 leading-relaxed ${bodyClassName}`}
      >
        {body}
      </p>
    </>
  );
}
