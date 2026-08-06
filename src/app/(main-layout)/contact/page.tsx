import ContactHero from "./_components/ContactHero";
import ContactForm from "./_components/ContactForm";
import ProductsFaq from "../products/_components/ProductsFaq";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ProductsFaq gradientIdPrefix="contact" useCmsContactFaq />
    </>
  );
}
