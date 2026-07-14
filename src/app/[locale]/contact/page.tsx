import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { FACTORY_MAP_EMBED } from '@/components/home/HomeContact';

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
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="overflow-hidden rounded-2xl border border-mist-900/10 shadow-card">
                <iframe
                  src={FACTORY_MAP_EMBED}
                  title={t('info.addressTitle')}
                  className="h-64 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
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
