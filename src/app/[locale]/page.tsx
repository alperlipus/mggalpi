import { Hero } from '@/components/home/Hero';
import { GroupSection } from '@/components/home/GroupSection';
import { VisionSection } from '@/components/home/VisionSection';
import { AnatomySection } from '@/components/home/AnatomySection';
import { SystemWizard } from '@/components/home/SystemWizard';
import { ProductsSection } from '@/components/home/ProductsSection';
import { WhyUs } from '@/components/home/WhyUs';
import { Certs } from '@/components/home/Certs';
import { ProjectsTeaser } from '@/components/home/ProjectsTeaser';
import { HomeContact } from '@/components/home/HomeContact';
import { SectionDots } from '@/components/home/SectionDots';

export default function HomePage() {
  return (
    <>
      <SectionDots />
      <Hero />
      <GroupSection />
      <VisionSection />
      <AnatomySection />
      <SystemWizard />
      <ProductsSection />
      <WhyUs />
      <Certs />
      <ProjectsTeaser />
      <HomeContact />
    </>
  );
}
