import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ListIcon, XIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useLang } from "../i18n/LangContext";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/services", label: t.nav.services },
    { to: "/contact", label: t.nav.contact },
  ];

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-stone-50/95 backdrop-blur-md ${scrolled ? "shadow-sm" : ""}`}
      >
        <nav
          className={`max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}
        >
          {/* brand */}
          <Link to="/" className="select-none flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center">
              <span className="font-display text-sm font-light text-stone-500 leading-none">
                M
              </span>
            </div>
            <div>
              <span className="block font-display text-[1.1rem] font-light tracking-[0.15em] uppercase text-stone-800 leading-none">
                Maison
              </span>
              <span className="block text-[8px] tracking-[0.35em] uppercase font-body font-medium text-stone-500 leading-none mt-0.5">
                Hair & Beauty
              </span>
            </div>
          </Link>

          {/* desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative text-[10px] tracking-[0.25em] uppercase font-body font-medium transition-colors duration-300 pb-0.5 ${
                    active
                      ? "text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-stone-900"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="w-px h-4 bg-stone-200" />

            <button
              onClick={() => setLang(lang === "en" ? "de" : "en")}
              className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-stone-400 hover:text-stone-700 transition-colors duration-300"
            >
              {lang === "en" ? "DE" : "EN"}
            </button>
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-stone-600 hover:text-stone-900 transition-colors"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <XIcon size={22} /> : <ListIcon size={22} />}
          </button>
        </nav>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-stone-900/30 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-0 z-50 flex flex-col bg-stone-50 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-20 items-center justify-between border-b border-stone-200 px-6">
                <span className="font-display text-xl font-light tracking-[0.15em] uppercase text-stone-800">
                  Maison
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-stone-400 hover:text-stone-800 transition-colors"
                >
                  <XIcon size={22} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center px-8">
                {navLinks.map((link, i) => {
                  const active = isActive(link.to);
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.06 + i * 0.07,
                        type: "spring",
                        stiffness: 55,
                        damping: 20,
                      }}
                    >
                      <Link
                        to={link.to}
                        className={`group flex items-center justify-between border-b border-stone-200 py-6 transition-colors duration-200 ${
                          active
                            ? "text-stone-900"
                            : "text-stone-500 hover:text-stone-900"
                        }`}
                      >
                        <span
                          className={`font-display text-2xl ${active ? "font-normal" : "font-light"}`}
                        >
                          {link.label}
                        </span>
                        <ArrowRightIcon
                          size={16}
                          className={`transition-all duration-300 group-hover:translate-x-1 ${active ? "text-stone-700" : "text-stone-300 group-hover:text-stone-500"}`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
                <button
                  onClick={() => {
                    setLang(lang === "en" ? "de" : "en");
                    setOpen(false);
                  }}
                  className="mt-8 w-fit text-xs tracking-[0.3em] uppercase font-body font-medium text-stone-600 hover:text-stone-800 transition-colors"
                >
                  {lang === "en" ? "Deutsch" : "English"}
                </button>
              </nav>

              <div className="border-t border-stone-200 px-8 py-6">
                <p className="text-[10px] tracking-[0.4em] uppercase font-body font-medium text-stone-500 mb-1">
                  {t.contact.label}
                </p>
                <a
                  href={`mailto:${t.footer.email}`}
                  className="text-sm font-body text-stone-500 hover:text-stone-800 transition-colors"
                >
                  {t.footer.email}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
