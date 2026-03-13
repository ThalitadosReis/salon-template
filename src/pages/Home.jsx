import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Reveal from "../components/Reveal";
import CtaLink from "../components/ui/CtaLink";
import SectionTextBlock from "../components/ui/SectionTextBlock";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  InstagramLogoIcon,
  ScissorsIcon,
  SparkleIcon,
  FlowerLotusIcon,
} from "@phosphor-icons/react";
import { useLang } from "../i18n/LangContext";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
  "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&q=80",
  "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=400&q=80",
  "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=400&q=80",
  "https://images.unsplash.com/photo-1629397662600-50ad523ef4fb?w=400&q=80",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80",
];

const serviceIcons = [SparkleIcon, ScissorsIcon, FlowerLotusIcon];

export default function Home() {
  const { t } = useLang();
  const h = t.hero;
  const a = t.about;
  const o = t.offer;
  const g = t.gallery;
  const c = t.contact;

  return (
    <main className="bg-stone-100 min-h-screen">
      {/* hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,var(--color-stone-300)_0%,var(--color-stone-50)_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs tracking-[0.4em] uppercase font-ui text-stone-500 mb-6"
              >
                {h.tagline}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-6xl lg:text-7xl xl:text-8xl font-light text-stone-900 whitespace-pre-line mb-6"
              >
                {h.headline}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-[15px] lg:text-base font-ui font-light text-stone-600 leading-relaxed max-w-sm mb-8"
              >
                {h.subheadline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                <CtaLink to="/contact" variant="dark">
                  {h.cta}
                </CtaLink>
              </motion.div>
            </div>

            {/* hero image collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative hidden lg:block"
            >
              {/* arch frame */}
              <div className="relative w-11/12 mx-auto">
                <div className="w-full aspect-3/4 rounded-t-full overflow-hidden ">
                  <img
                    src="https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80"
                    alt="Salon"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* floating badge */}
                <div className="absolute -right-8 bottom-16 bg-white rounded-2xl px-6 py-4 shadow-[0_8px_40px_rgb(44_37_32/12%)]">
                  <p className="text-[9px] tracking-[0.3em] uppercase font-ui text-stone-500">
                    Est. 2015
                  </p>
                  <p className="font-display text-2xl font-light text-stone-900 mt-0.5">
                    500+
                  </p>
                  <p className="text-[11px] font-ui text-stone-500">
                    Happy clients
                  </p>
                </div>
                {/* small image circle */}
                <div className="absolute -left-6 top-20 w-28 h-28 rounded-full overflow-hidden border-4 border-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80"
                    alt="Detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase font-ui text-stone-500">
            {h.scroll}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <ArrowDownIcon size={14} className="text-stone-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* about */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* images */}
            <Reveal direction="right" className="relative">
              <div className="relative">
                <div className="w-full aspect-square rounded-3xl overflow-hidden bg-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=700&q=80"
                    alt="About"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* oval image */}
                <div className="absolute -bottom-4 -right-4 w-24 h-32 md:-bottom-8 lg:-right-8 md:w-36 md:h-44 rounded-full overflow-hidden border-4 border-stone-50">
                  <img
                    src="https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=300&q=80"
                    alt="Detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.15}>
              <SectionTextBlock label={a.label} title={a.title} body={a.body} />
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-ui text-stone-700 border-b border-stone-400 pb-1 hover:text-stone-500 transition-colors duration-300 group mt-8"
              >
                {a.learnMore}
                <ArrowRightIcon
                  size={12}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* what we offer */}
      <section className="py-32 bg-stone-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <Reveal>
              <SectionTextBlock label={o.label} title={o.title} body={o.sub} />
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {o.items.map((item, i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={item.name} delay={i * 0.12}>
                  <div className="bg-stone-50 rounded-3xl p-8 relative overflow-hidden">
                    {/* arch accent top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 border border-stone-300 rounded-b-full border-t-0" />
                    <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center mb-6 mt-4">
                      <Icon size={20} className="text-stone-500" />
                    </div>
                    <h3 className="font-display text-2xl font-light text-stone-900 mb-3">
                      {item.name}
                    </h3>
                    <p className="text-sm font-ui font-light text-stone-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3} className="text-center mt-14">
            <CtaLink to="/services" variant="outline">
              {o.viewAll}
            </CtaLink>
          </Reveal>
        </div>
      </section>

      {/* instagram gallery */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <Reveal>
              <SectionTextBlock label={g.label} title={g.title} />
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-ui text-stone-700 border-b border-dashed border-stone-400 pb-1 hover:text-stone-500 transition-colors duration-300"
              >
                <InstagramLogoIcon size={14} />
                {g.viewMore}
              </a>
            </Reveal>
          </div>

          {/* image grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`block overflow-hidden rounded-2xl bg-stone-200 group ${i === 1 || i === 4 ? "mt-6" : ""}`}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* contact */}
      <section className="py-32 bg-stone-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative text-center">
          <Reveal>
            <SectionTextBlock
              label={c.label}
              title={c.title}
              body={c.sub}
              bodyClassName="mb-8"
            />
            <CtaLink to="/contact" variant="accent">
              {c.cta}
            </CtaLink>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
