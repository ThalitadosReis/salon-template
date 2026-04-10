import { motion } from "motion/react";
import { CheckIcon } from "@phosphor-icons/react";
import Reveal from "../components/Reveal";
import CtaLink from "../components/ui/CtaLink";
import Label from "../components/ui/Label";
import { useLang } from "../i18n/LangContext";

const IMAGES = [
  "https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?w=600&q=85",
  "https://images.pexels.com/photos/3993445/pexels-photo-3993445.jpeg?w=600&q=85",
  "https://images.pexels.com/photos/3993451/pexels-photo-3993451.jpeg?w=600&q=85",
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
};
const listItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 72, damping: 18 },
  },
};

export default function Services() {
  const { t } = useLang();
  const s = t.services;
  const c = t.contact;
  const categories = s.categories;

  return (
    <main className="bg-stone-100 min-h-screen">
      {/* hero */}
      <section className="bg-stone-200 pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <Label
              as="h1"
              label={s.label}
              title={s.hero}
              body={s.sub}
              titleSize="lg"
            />
          </Reveal>
        </div>
      </section>

      {/* service categories */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {categories.map((cat, ci) => (
          <div
            key={cat.name}
            className={`py-24 lg:py-32 ${ci < categories.length - 1 ? "border-b border-stone-300" : ""}`}
          >
            <div
              className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-start ${ci % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              {/* image */}
              <Reveal direction={ci % 2 === 0 ? "right" : "left"}>
                <div className="aspect-square overflow-hidden bg-stone-200">
                  <img
                    src={IMAGES[ci]}
                    alt={`${cat.name} service at Maison Hair & Beauty`}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </Reveal>

              {/* services list */}
              <Reveal direction={ci % 2 === 0 ? "left" : "right"} delay={0.1}>
                <div className="relative mb-10">
                  <span
                    className="absolute font-display font-light text-[5.5rem] lg:text-[7.5rem] leading-none text-stone-200 select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {String(ci + 1).padStart(2, "0")}
                  </span>
                  <h2 className="relative font-display font-light text-4xl text-stone-800 pt-10 lg:pt-14">
                    {cat.name}
                  </h2>
                </div>

                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {cat.items.map((item) => (
                    <motion.li key={item.name} variants={listItem}>
                      <div className="group flex items-start justify-between gap-6 py-4 border-b border-stone-200 hover:border-stone-400 transition-colors duration-300">
                        <div className="flex gap-3 items-start">
                          <CheckIcon
                            size={12}
                            className="text-stone-600 mt-1.5 shrink-0"
                          />
                          <div>
                            <p className="text-base font-body font-medium text-stone-700 mb-0.5 group-hover:text-stone-900 transition-colors duration-300">
                              {item.name}
                            </p>
                            <p className="text-base font-body text-stone-600 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <span className="font-display text-xl font-medium italic text-stone-600 shrink-0">
                          {item.price}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </Reveal>
            </div>
          </div>
        ))}
      </div>

      {/* cta */}
      <section className="bg-stone-200 py-24 text-center">
        <Reveal>
          <p className="text-[10px] tracking-[0.55em] uppercase font-body font-medium text-stone-500 mb-5">
            {c.label}
          </p>
          <h2 className="font-display font-light text-4xl text-stone-800 leading-[1.1] mb-10 whitespace-pre-line">
            {c.title}
          </h2>
          <CtaLink to="/contact" variant="primary">
            {c.cta}
          </CtaLink>
        </Reveal>
      </section>
    </main>
  );
}
