import { Link } from "react-router-dom";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  InstagramLogoIcon,
  FacebookLogoIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
import { useLang } from "../i18n/LangContext";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="bg-stone-200 border-t border-stone-200">
      {/* map */}
      <div className="w-full h-44 opacity-60 grayscale">
        <iframe
          title="Salon Location"
          src="https://www.google.com/maps?q=Bahnhofstrasse+12+Horw&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>

      <div className="border-t border-stone-200" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* brand */}
          <div>
            <p className="font-display text-2xl font-light tracking-[0.15em] text-stone-800 uppercase mb-1">
              Maison
            </p>
            <p className="text-[9px] tracking-[0.4em] text-stone-500 uppercase font-body font-medium mb-6">
              Hair & Beauty Studio
            </p>
            <p className="text-sm font-body text-stone-600 leading-[1.8] max-w-xs mb-6">
              {f.tagline}
            </p>
            <div className="flex gap-3">
              {[
                {
                  href: "https://instagram.com",
                  Icon: InstagramLogoIcon,
                  label: "Follow us on Instagram",
                },
                {
                  href: "https://facebook.com",
                  Icon: FacebookLogoIcon,
                  label: "Follow us on Facebook",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-stone-300 flex items-center justify-center text-stone-500 hover:border-stone-400 hover:text-stone-500 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* hours */}
          <div>
            <p className="text-xs tracking-[0.5em] uppercase font-body font-medium text-stone-500 mb-6">
              {f.hours}
            </p>
            <ul className="space-y-0">
              {f.hoursData.map((h) => (
                <li
                  key={h.day}
                  className="flex justify-between gap-8 text-sm font-body border-b border-stone-300 py-2 last:border-0"
                >
                  <span className="text-stone-600">{h.day}</span>
                  <span className="text-stone-500">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <p className="text-xs tracking-[0.5em] uppercase font-body font-medium text-stone-500 mb-6">
              {f.contact}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon
                  size={14}
                  className="text-stone-400 shrink-0 mt-0.5"
                />
                <span className="text-sm font-body text-stone-600 leading-relaxed">
                  {f.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon size={14} className="text-stone-400 shrink-0" />
                <a
                  href={`tel:${f.phone}`}
                  className="text-sm font-body text-stone-600 hover:text-stone-800 transition-colors"
                >
                  {f.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeIcon size={14} className="text-stone-400 shrink-0" />
                <a
                  href={`mailto:${f.email}`}
                  className="text-sm font-body text-stone-600 hover:text-stone-800 transition-colors"
                >
                  {f.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-stone-300 py-5 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs font-body text-stone-400">
            © {new Date().getFullYear()} Maison Hair & Beauty. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/impressum"
              className="text-xs font-body text-stone-400 hover:text-stone-600 transition-colors"
            >
              {f.impressum}
            </Link>
            <Link
              to="/privacy"
              className="text-xs font-body text-stone-400 hover:text-stone-600 transition-colors"
            >
              {f.privacy}
            </Link>
          </div>
          <a
            href="https://thalitadosreis.ch/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-body text-stone-400 hover:text-stone-500 transition-colors"
          >
            Made by Thalita dos Reis
            <ArrowUpRightIcon size={10} />
          </a>
        </div>
      </div>
    </footer>
  );
}
