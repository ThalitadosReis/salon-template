import { Link } from "react-router-dom";

const variants = {
  primary: "bg-stone-500 text-white hover:bg-stone-600",
  outline:
    "border border-stone-500 text-stone-600 hover:bg-stone-500 hover:text-white",
};

export default function CtaLink({
  to,
  children,
  variant = "primary",
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`
        inline-flex items-center justify-center px-8 py-3 text-[10px] tracking-[0.45em] uppercase font-body font-medium
        transition-all duration-300
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </Link>
  );
}
