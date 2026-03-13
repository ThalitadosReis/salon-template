import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useLang } from "../i18n/LangContext";
import CtaLink from "./ui/CtaLink";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-stone-50" : "bg-transparent"}`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none select-none">
          <span className="font-display text-2xl font-light tracking-[0.15em] text-stone-900 uppercase">
            Salon
          </span>
          <span className="text-[10px] tracking-[0.35em] text-stone-500 uppercase font-ui font-light">
            Hair & Beauty
          </span>
        </Link>

        {/* desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-[11px] tracking-[0.2em] uppercase font-ui text-stone-600 hover:text-stone-400 transition-colors duration-300"
          >
            {t.nav.home}
          </Link>
          <Link
            to="/services"
            className="text-[11px] tracking-[0.2em] uppercase font-ui text-stone-600 hover:text-stone-400 transition-colors duration-300"
          >
            {t.nav.services}
          </Link>
          <CtaLink
            to="/contact"
            variant="outline"
            showIcon={false}
            className="px-6"
          >
            {t.nav.contact}
          </CtaLink>
          <button
            onClick={() => setLang(lang === "en" ? "de" : "en")}
            className="text-[11px] tracking-[0.2em] uppercase font-ui text-stone-500 hover:text-stone-400 transition-colors duration-300 border-b border-dashed border-stone-400"
          >
            {lang === "en" ? "DE" : "EN"}
          </button>
        </div>

        <button
          className="md:hidden text-stone-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </nav>

      {/* mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-stone-50 border-t border-stone-200 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <Link
                to="/"
                className="text-xs tracking-[0.25em] uppercase font-ui text-stone-600"
              >
                {t.nav.home}
              </Link>
              <Link
                to="/services"
                className="text-xs tracking-[0.25em] uppercase font-ui text-stone-600"
              >
                {t.nav.services}
              </Link>
              <Link
                to="/contact"
                className="text-xs tracking-[0.25em] uppercase font-ui text-stone-600"
              >
                {t.nav.contact}
              </Link>
              <button
                onClick={() => setLang(lang === "en" ? "de" : "en")}
                className="w-fit text-left text-xs tracking-[0.25em] uppercase font-ui text-stone-500 hover:text-stone-900 transition-colors duration-300 border-b border-dashed border-stone-400"
              >
                {lang === "en" ? "Deutsch" : "English"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
