import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  InstagramLogoIcon,
  FacebookLogoIcon,
} from "@phosphor-icons/react";
import { useLang } from "../i18n/LangContext";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="bg-stone-200">
      {/* map embed */}
      <div className="w-full h-64 grayscale opacity-80">
        <iframe
          title="Salon Location"
          src="https://www.google.com/maps?q=Bahnhofstrasse+12+Horw&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* brand */}
        <div className="space-y-4">
          <div className="mb-4 flex flex-col leading-none select-none">
            <span className="font-display text-2xl font-light tracking-[0.15em] text-stone-900 uppercase">
              Salon
            </span>
            <span className="text-[10px] tracking-[0.35em] text-stone-500 uppercase font-ui font-light">
              Hair & Beauty
            </span>
          </div>
          <p className="text-sm font-ui font-light leading-relaxed text-stone-500">
            {f.tagline}
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-stone-500 hover:text-stone-400 transition-colors duration-300"
            >
              <InstagramLogoIcon size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-stone-500 hover:text-stone-400 transition-colors duration-300"
            >
              <FacebookLogoIcon size={20} />
            </a>
          </div>
        </div>

        {/* hours */}
        <div>
          <h4 className="text-sm tracking-[0.2em] uppercase font-ui text-stone-500 mb-4">
            {f.hours}
          </h4>
          <ul className="space-y-3">
            {f.hoursData.map((h) => (
              <li
                key={h.day}
                className="flex justify-between text-sm font-ui font-light"
              >
                <span className="text-stone-500">{h.day}</span>
                <span className="text-stone-400">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <h4 className="text-sm tracking-[0.2em] uppercase font-ui text-stone-500 mb-4">
            {f.contact}
          </h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm font-ui font-light text-stone-500">
              <MapPinIcon size={16} className="shrink-0 text-stone-500" />
              <span>{f.address}</span>
            </li>
            <li className="flex items-center gap-3 text-sm font-ui font-light text-stone-500">
              <PhoneIcon size={16} className="shrink-0 text-stone-500" />
              <a
                href={`tel:${f.phone}`}
                className="hover:text-stone-400 transition-colors"
              >
                {f.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm font-ui font-light text-stone-500">
              <EnvelopeIcon size={16} className="shrink-0 text-stone-500" />
              <a
                href={`mailto:${f.email}`}
                className="hover:text-stone-400 transition-colors"
              >
                {f.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-300 py-6 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <p className="text-xs font-ui text-stone-500">
            © {new Date().getFullYear()} Salon Hair & Beauty.
          </p>
          <p className="text-xs font-ui text-stone-500 md:text-right">
            Made by Thalita dos Reis
          </p>
        </div>
      </div>
    </footer>
  );
}
