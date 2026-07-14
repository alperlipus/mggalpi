import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';

export function HomeContact() {
  const t = useTranslations('contact');

  const infoItems = [
    { icon: MapPin, title: t('info.addressTitle'), value: t('info.address'), dir: undefined },
    { icon: Phone, title: t('info.phoneTitle'), value: t('info.phone'), dir: 'ltr' as const },
    { icon: Mail, title: t('info.emailTitle'), value: t('info.email'), dir: 'ltr' as const },
    { icon: Clock, title: t('info.hoursTitle'), value: t('info.hours'), dir: undefined },
  ];

  return (
    <section id="iletisim" className="section-pad scroll-mt-20 bg-mist-50">
      <div className="container-page">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
            <span className="h-px w-8 bg-volt-500" aria-hidden />
            {t('hero.eyebrow')}
          </p>
          <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold tracking-tight text-graphite-700 sm:text-4xl">
            {t('hero.title')}
          </h2>
          <p className="mt-4 max-w-lg text-mist-600">{t('hero.subtitle')}</p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-7">
            {infoItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700">
                  <item.icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-graphite-700">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist-600" dir={item.dir}>
                    {item.value}
                  </p>
                  {item.icon === MapPin && (
                    <a
                      href={t('info.mapsUrl')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-volt-700 transition-colors hover:text-volt-600"
                    >
                      {t('info.directions')}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
