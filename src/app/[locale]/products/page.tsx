import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { ProductsGrid } from '@/components/ProductsGrid';

export default async function ProductsPage() {
  const t = await getTranslations('products.hero');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <section className="section-pad bg-white">
        <div className="container-page">
          <ProductsGrid />
        </div>
      </section>
    </>
  );
}
