import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';

export function ProductsSection() {
  const t = useTranslations('productsSection');
  const featured = [products[0], products[2], products[4], products[6]];

  return (
    <section id="urunler" className="section-pad scroll-mt-20 bg-white">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-volt-700">
                <span className="h-px w-8 bg-volt-500" aria-hidden />
                {t('eyebrow')}
              </p>
              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold tracking-tight text-graphite-950 sm:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-4 max-w-lg text-mist-700">{t('subtitle')}</p>
            </div>
            <Link
              href="/products"
              className="group hidden shrink-0 items-center gap-2 rounded-full border border-graphite-950/15 px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-graphite-950 hover:text-white sm:flex"
            >
              {t('viewAll')}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <Link
          href="/products"
          className="mt-10 flex items-center justify-center gap-2 rounded-full border border-graphite-950/15 px-5 py-3 text-sm font-semibold text-graphite-950 sm:hidden"
        >
          {t('viewAll')}
          <ArrowRight size={15} className="rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
