'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

/* Consolidated nav: one-page anchors on home + two standalone pages. */
const navItems = [
  { href: '/#grup', key: 'group' },
  { href: '/#urunler', key: 'products' },
  { href: '/#referanslar', key: 'projects' },
  { href: '/resources', key: 'resources' },
  { href: '/calculator', key: 'calculator' },
  { href: '/#iletisim', key: 'contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* Over the dark cinematic hero the header is transparent with white
     assets; once scrolled it becomes a light glass bar. */
  const dark = !scrolled && !mobileOpen;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label={t('brand')}>
          <Image
            src={dark ? '/brand/simsek-solar-white.png' : '/brand/simsek-solar.png'}
            alt={t('brand')}
            width={499}
            height={129}
            priority
            className="h-9 w-auto object-contain sm:h-10"
          />
        </Link>

        <nav className="hidden min-w-0 items-center gap-6 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                dark ? 'text-white/80 hover:text-white' : 'text-graphite-900/80 hover:text-graphite-700'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-simsek-ai'))}
            aria-label="şimşek.ai"
            className={`group flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-sm font-semibold transition-colors xl:px-3.5 ${
              dark
                ? 'border-white/25 bg-white/10 text-white hover:border-volt-400'
                : 'border-graphite-700/20 bg-white text-graphite-900 hover:border-volt-500'
            }`}
          >
            <Sparkles size={14} className="shrink-0 text-volt-500" />
            <span className="hidden font-mono text-[13px] tracking-tight xl:inline">
              şimşek<span className="text-volt-500">.ai</span>
            </span>
            <ChevronRight
              size={14}
              className={`hidden shrink-0 transition-transform group-hover:translate-x-0.5 xl:inline rtl:group-hover:-translate-x-0.5 rtl:rotate-180 ${
                dark ? 'text-white/60' : 'text-graphite-400'
              }`}
            />
          </button>
          <LanguageSwitcher dark={dark} />
          <Link
            href="/#iletisim"
            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03] xl:px-5 ${
              dark
                ? 'bg-solar-gradient text-graphite-900 shadow-glow'
                : 'bg-graphite-700 text-white hover:bg-graphite-800'
            }`}
          >
            {t('getQuote')}
          </Link>
        </div>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
            dark ? 'text-white' : 'text-graphite-900'
          }`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-graphite-700/10 bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-graphite-900 hover:bg-graphite-100"
              >
                {t(item.key)}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new Event('open-simsek-ai'));
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-graphite-900 hover:bg-graphite-100"
            >
              <Sparkles size={16} className="text-volt-600" />
              <span className="font-mono">
                şimşek<span className="text-volt-600">.ai</span>
              </span>
            </button>
            <div className="mt-2 flex items-center justify-between px-3">
              <LanguageSwitcher />
              <Link
                href="/#iletisim"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-graphite-700 px-5 py-2.5 text-sm font-semibold text-white"
              >
                {t('getQuote')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
