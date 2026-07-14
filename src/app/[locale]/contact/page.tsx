import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';

export default async function ContactPage() {
  const t = await getTranslations('contact');

  const infoItems = [
    { icon: MapPin, title: t('info.addressTitle'), value: t('info.address'), dir: undefined },
    { icon: Phone, title: t('info.phoneTitle'), value: t('info.phone'), dir: 'ltr' },
    { icon: Mail, title: t('info.emailTitle'), value: t('info.email'), dir: 'ltr' },
    { icon: Clock, title: t('info.hoursTitle'), value: t('info.hours'), dir: undefined },
  ] as const;

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      <section className="section-pad bg-white">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-7">
            {infoItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-600">
                  <item.icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-graphite-950">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist-700" dir={item.dir}>
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

            <Reveal delay={0.3}>
              <div className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-graphite-700 via-graphite-900 to-graphite-950">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white, transparent 55%)' }} />
                <MapPin size={64} strokeWidth={1} className="absolute bottom-6 end-6 text-white/30" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
