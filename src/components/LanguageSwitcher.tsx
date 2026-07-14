'use client';

import { useLocale } from 'next-intl';
import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
          dark
            ? 'border-white/20 text-white hover:bg-white/10'
            : 'border-mist-700/20 text-mist-900 hover:bg-mist-900/5'
        }`}
      >
        <Globe size={15} />
        {localeNames[locale]}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute end-0 z-50 mt-2 min-w-[9rem] overflow-hidden rounded-xl border border-black/5 bg-white py-1 shadow-xl">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => router.replace(pathname, { locale: l })}
              className={`block w-full px-4 py-2 text-start text-sm hover:bg-mist-100 ${
                l === locale ? 'font-semibold text-volt-600' : 'text-mist-800'
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
