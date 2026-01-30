import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CardTypesSection } from "@/components/home/CardTypesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { PageTransition } from "@/components/layout/PageTransition";

const Index = () => {
  return (
    <Layout>
      <PageTransition>
        <HeroSection />
        <FeaturesSection />
        <CardTypesSection />
        <HowItWorksSection />
      </PageTransition>
    </Layout>
  );
};

export default Index;
