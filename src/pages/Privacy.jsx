import Reveal from "../components/Reveal";
import Label from "../components/ui/Label";
import { useLang } from "../i18n/LangContext";

export default function Privacy() {
  const { t } = useLang();
  const p = t.privacy;

  return (
    <main className="bg-stone-100 min-h-screen">
      <section className="bg-stone-200 pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <Label
              as="h1"
              label={p.label}
              title={p.hero}
              body={p.sub}
              titleSize="lg"
            />
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="border border-stone-300 bg-stone-50 px-5 py-4 mb-12">
            <p className="text-[10px] tracking-[0.45em] uppercase font-body font-medium text-stone-500 mb-1">
              Template Notice
            </p>
            <p className="text-sm font-body text-stone-600 leading-relaxed">
              {p.templateNotice}
            </p>
          </div>

          {p.sections.map((section, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div
                className={`py-12 ${i < p.sections.length - 1 ? "border-b border-stone-200" : ""}`}
              >
                <p className="text-[10px] tracking-[0.55em] uppercase font-body font-medium text-stone-500 mb-3">
                  {section.label}
                </p>
                <h2 className="font-display font-light text-2xl text-stone-800 mb-6">
                  {section.heading}
                </h2>
                {section.content.map((para, j) => (
                  <p
                    key={j}
                    className="text-base font-body text-stone-600 leading-[1.8] whitespace-pre-line mb-4 last:mb-0"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
