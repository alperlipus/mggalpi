import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { ProductFamilies } from '@/components/ProductFamilies';

export default async function ProductsPage() {
  const t = await getTranslations('products.hero');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <section className="section-pad bg-mist-50">
        <div className="container-page">
          <ProductFamilies />
        </div>
      </section>
    </>
  );
}
