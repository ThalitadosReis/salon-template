import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Reveal from "../components/Reveal";
import CtaLink from "../components/ui/CtaLink";
import Label from "../components/ui/Label";
import {
  InstagramLogoIcon,
  ScissorsIcon,
  SparkleIcon,
  HandHeartIcon,
} from "@phosphor-icons/react";
import { useLang } from "../i18n/LangContext";

const FEATURE_ICONS = [SparkleIcon, HandHeartIcon, ScissorsIcon];

const HERO_IMAGES = [
  "https://images.pexels.com/photos/3992879/pexels-photo-3992879.jpeg?w=600&q=85",
  "https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?w=600&q=85",
  "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?w=600&q=85",
];

const SERVICE_IMAGES = [
  "https://images.pexels.com/photos/3993310/pexels-photo-3993310.jpeg?w=600&q=85",
  "https://images.pexels.com/photos/3993445/pexels-photo-3993445.jpeg?w=600&q=85",
  "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?w=600&q=85",
];

const INSTAGRAM_IMAGES = [
  "https://images.pexels.com/photos/3993472/pexels-photo-3993472.jpeg?w=300&q=80",
  "https://images.pexels.com/photos/3993471/pexels-photo-3993471.jpeg?w=300&q=80",
  "https://images.pexels.com/photos/3993470/pexels-photo-3993470.jpeg?w=300&q=80",
  "https://images.pexels.com/photos/3993469/pexels-photo-3993469.jpeg?w=300&q=80",
  "https://images.pexels.com/photos/3993468/pexels-photo-3993468.jpeg?w=300&q=80",
  "https://images.pexels.com/photos/3993467/pexels-photo-3993467.jpeg?w=300&q=80",
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 72, damping: 18 },
  },
};

export default function Home() {
  const { t } = useLang();
  const h = t.hero;
  const a = t.about;
  const o = t.offer;
  const g = t.gallery;
  const c = t.contact;
  const ft = t.features;
  const q = t.quote;
  const tm = t.testimonial;

  return (
    <main className="bg-stone-100 pt-20">
      {/* hero */}
      <section>
        {/* photo strip */}
        <motion.div
          className="grid grid-cols-3 gap-1 h-[52vh] min-h-80 max-h-130"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {HERO_IMAGES.map((src, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="overflow-hidden bg-stone-200"
            >
              <img
                src={src}
                alt=""
                role="presentation"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* hero text below photos */}
        <div className="bg-stone-50 py-20 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
            className="text-[10px] tracking-[0.55em] uppercase font-body font-medium text-stone-500 mb-5"
          >
            {h.tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              delay: 0.45,
            }}
            className="font-display font-light text-5xl xl:text-6xl text-stone-800 leading-[1.12] max-w-xl mx-auto mb-5 whitespace-pre-line"
          >
            {h.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.45, ease: "easeOut" }}
            className="text-base font-body text-stone-600 max-w-sm mx-auto leading-[1.8] mb-10"
          >
            {h.subheadline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.4, ease: "easeOut" }}
          >
            <CtaLink to="/services" variant="primary">
              {o.viewAll}
            </CtaLink>
          </motion.div>
        </div>
      </section>

      {/* about */}
      <section className="bg-stone-100 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch">
            <Reveal direction="right" className="overflow-hidden">
              <div className="h-full aspect-square min-h-100 lg:min-h-120 bg-stone-300">
                <img
                  src="https://images.pexels.com/photos/3993458/pexels-photo-3993458.jpeg"
                  alt="Interior view of Maison Hair & Beauty salon"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal
              direction="left"
              delay={0.1}
              className="bg-stone-200 flex flex-col justify-center p-10 lg:p-14"
            >
              <p className="text-[10px] tracking-[0.55em] uppercase font-body font-medium text-stone-500 mb-4">
                {a.label}
              </p>
              <h2 className="font-display font-light text-3xl lg:text-4xl text-stone-800 leading-[1.15] mb-5 whitespace-pre-line">
                {a.title}
              </h2>
              <p className="text-base font-body text-stone-600 leading-[1.8] mb-8 max-w-sm">
                {a.body}
              </p>
              <div>
                <CtaLink to="/services" variant="outline">
                  {a.learnMore}
                </CtaLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* what we offer */}
      <section className="bg-stone-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal className="text-center mb-5">
            <Label
              label={o.label}
              title={o.title}
              body={o.sub}
              center
              titleSize="sm"
            />
          </Reveal>

          {/* image grid with overlays */}
          <motion.div
            className="grid md:grid-cols-3 gap-3 mt-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {o.items.map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link
                  to="/services"
                  className="block relative overflow-hidden group bg-stone-300 aspect-square"
                >
                  <img
                    src={SERVICE_IMAGES[i]}
                    alt=""
                    role="presentation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-900/65 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] tracking-[0.35em] uppercase font-body font-medium text-white/90">
                    {item.name}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* quote */}
      <section className="bg-stone-100 py-20 lg:py-28 px-6">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="font-display font-light italic text-2xl lg:text-3xl xl:text-4xl text-stone-700 leading-normal">
            &ldquo;{q.text}&rdquo;
          </p>
        </Reveal>
      </section>

      {/* features */}
      <section className="bg-stone-50 py-20 lg:py-28 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="grid md:grid-cols-3 gap-12 text-center"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {ft.items.map((feature, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <motion.div key={i} variants={fadeUp}>
                  <div className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center mx-auto mb-4">
                    <Icon size={20} className="text-stone-400" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-stone-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-base font-body text-stone-600 leading-[1.8] max-w-50 mx-auto">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <Reveal delay={0.2} className="text-center mt-14">
            <CtaLink to="/contact" variant="primary">
              {c.cta}
            </CtaLink>
          </Reveal>
        </div>
      </section>

      {/* testimonial */}
      <section className="bg-stone-100 py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <p className="text-[10px] tracking-[0.55em] uppercase font-body font-medium text-stone-500 mb-6">
                {tm.label}
              </p>
              <blockquote className="font-display font-light text-3xl lg:text-4xl text-stone-800 leading-[1.3] mb-7">
                &ldquo;{tm.quote}&rdquo;
              </blockquote>
              <p className="text-[11px] tracking-[0.3em] uppercase font-body font-medium text-stone-500">
                — {tm.attribution}
              </p>
            </Reveal>

            <Reveal direction="left" delay={0.1} className="hidden lg:block">
              <div className="aspect-square overflow-hidden bg-stone-300">
                <img
                  src="https://images.pexels.com/photos/3993472/pexels-photo-3993472.jpeg"
                  alt={`Portrait of client ${tm.attribution}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* instagram */}
      <section className="bg-stone-50 py-20 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <Reveal>
              <p className="text-[10px] tracking-[0.55em] uppercase font-body font-medium text-stone-500">
                {g.label}
              </p>
              <h3 className="font-display font-light text-2xl text-stone-800 mt-1">
                {g.handle}
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-stone-500 border-b border-dashed border-stone-300 pb-1 hover:text-stone-600 transition-colors"
              >
                <InstagramLogoIcon size={14} />
                {g.viewMore}
              </a>
            </Reveal>
          </div>

          <motion.div
            className="grid grid-cols-3 md:grid-cols-6 gap-2"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {INSTAGRAM_IMAGES.map((src, i) => (
              <motion.a
                key={i}
                variants={fadeUp}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="block aspect-square overflow-hidden bg-stone-200 group"
              >
                <img
                  src={src}
                  alt=""
                  role="presentation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.a>
            ))}
          </motion.div>

          <div className="flex md:hidden justify-center mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-body font-medium text-stone-500 border-b border-dashed border-stone-300 pb-1 hover:text-stone-600 transition-colors"
            >
              <InstagramLogoIcon size={14} />
              {g.viewMore}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
