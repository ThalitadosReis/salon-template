import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";

const BASE_CLASS =
  "inline-flex items-center gap-3 px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-ui rounded-full transition-colors duration-300 group";

const VARIANT_CLASS = {
  dark: "bg-stone-900 text-stone-100 hover:bg-stone-500",
  accent: "bg-stone-500 text-white hover:bg-stone-600",
  outline:
    "border border-stone-400 text-stone-700 hover:bg-stone-500 hover:text-white",
};

export default function CtaLink({
  to,
  children,
  variant = "dark",
  className = "",
  iconSize = 14,
}) {
  return (
    <Link
      to={to}
      className={`${BASE_CLASS} ${VARIANT_CLASS[variant]} ${className}`}
    >
      {children}
      <ArrowRightIcon
        size={iconSize}
        className="group-hover:translate-x-1 transition-transform duration-300"
      />
    </Link>
  );
}
