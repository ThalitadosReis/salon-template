import { CheckCircleIcon } from "@phosphor-icons/react";
import Reveal from "../components/Reveal";
import CtaLink from "../components/ui/CtaLink";
import { useLang } from "../i18n/LangContext";

const categoryImages = [
  "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=800&q=80",
];

export default function Services() {
  const { t } = useLang();

  const s = t.services;
  const nav = t.nav;
  const categories = t.services.categories;

  return (
    <main className="bg-stone-50 min-h-screen pt-20">
      {/* hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <p className="text-xs tracking-[0.4em] uppercase font-ui text-stone-500 mb-4">
              {s.label}
            </p>
            <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl font-light text-stone-900 whitespace-pre-line mb-6">
              {s.hero}
            </h1>
            <p className="text-[15px] lg:text-base font-ui font-light text-stone-600">
              {s.sub}
            </p>
          </Reveal>
        </div>
      </section>

      {/* service categories */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-28">
          {categories.map((cat, ci) => (
            <div key={cat.name}>
              <Reveal>
                <div
                  className={`grid lg:grid-cols-2 gap-16 items-start ${ci % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  {/* image */}
                  <div
                    className={`relative ${ci % 2 === 1 ? "lg:col-start-2" : ""}`}
                  >
                    <div
                      className={`w-full aspect-4/3 rounded-3xl overflow-hidden bg-stone-200 ${ci % 2 === 1 ? "rounded-3xl" : "rounded-tl-[6rem] rounded-3xl"}`}
                    >
                      <img
                        src={categoryImages[ci]}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* services list */}
                  <div
                    className={`pt-6 ${ci % 2 === 1 ? "lg:col-start-1" : ""}`}
                  >
                    <h2 className="font-display text-4xl font-light text-stone-900 mb-10">
                      {cat.name}
                    </h2>
                    <ul className="space-y-6">
                      {cat.items.map((item, ii) => (
                        <Reveal key={item.name} delay={ii * 0.08}>
                          <li className="group">
                            <div className="flex items-start justify-between gap-4 pb-5 border-b border-stone-200">
                              <div className="flex gap-3 items-start">
                                <CheckCircleIcon
                                  size={16}
                                  className="text-stone-500 mt-0.5 shrink-0"
                                />
                                <div>
                                  <p className="font-ui text-base font-medium text-stone-900 mb-1">
                                    {item.name}
                                  </p>
                                  <p className="font-ui text-sm font-light text-stone-500">
                                    {item.desc}
                                  </p>
                                </div>
                              </div>
                              <span className="font-display text-xl text-stone-500 shrink-0 font-light">
                                {item.price}
                              </span>
                            </div>
                          </li>
                        </Reveal>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="py-20 bg-stone-200">
        <Reveal className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-light text-stone-900 mb-4">
            Ready to book?
          </h2>
          <p className="text-base font-ui font-light text-stone-500 mb-8">
            Choose your service and we'll handle the rest.
          </p>
          <CtaLink to="/contact" variant="dark">
            {nav.contact}
          </CtaLink>
        </Reveal>
      </section>
    </main>
  );
}
