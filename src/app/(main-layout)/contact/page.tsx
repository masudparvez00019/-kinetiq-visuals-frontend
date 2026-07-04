import ContactHero from "./_components/ContactHero";
import ContactForm from "./_components/ContactForm";
import ProductsFaq from "../products/_components/ProductsFaq";

const CONTACT_FAQS = [
  {
    question: "What video editing services do you provide?",
    answer: "We provide a comprehensive range of video editing services tailored to meet your needs. Our offerings include social media video edits, promotional video production, real estate video editing, and corporate video editing. Each service is designed to enhance your content and engage your audience effectively. For a detailed overview of our services, please check our Services page.",
  },
  {
    question: "What types of video editing services do you offer?",
    answer: "We offer reels/shorts editing, drone mapping overlays, custom corporate explainers, high-end YouTube video production, and property walkthrough videos.",
  },
  {
    question: "How long does it take to complete a project?",
    answer: "Our standard turnaround time is 48 hours for standard social reels and property walkthroughs. Highly complex explainers or CGI integrations can take up to 4-5 business days.",
  },
  {
    question: "What is your pricing structure for video editing?",
    answer: "We offer transparent project-based pricing starting at $249 per project, as well as customized monthly retainer packages for active content creators.",
  },
];

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ProductsFaq faqs={CONTACT_FAQS} gradientIdPrefix="contact" />
    </>
  );
}
