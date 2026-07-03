import React from "react";
import HeroSection from "./_components/HeroSection";
import TrustedBy from "./_components/TrustedBy";
import ShowcaseSection from "./_components/ShowcaseSection";
import CaseStudies from "./_components/CaseStudies";
import ServicesSection from "./_components/ServicesSection";
import Testimonials from "./_components/Testimonials";
import ProcessSection from "./_components/ProcessSection";
import CtaSection from "./_components/CtaSection";
import FaqSection from "./_components/FaqSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <ShowcaseSection />
      <CaseStudies />
      <ServicesSection />
      <Testimonials />
      <ProcessSection />
      <CtaSection />
      <FaqSection />
    </>
  );
};

export default HomePage;