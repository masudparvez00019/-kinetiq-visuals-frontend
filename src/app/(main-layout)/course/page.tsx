import CourseHero from "./_components/CourseHero";
import TrustedBy from "../(home)/_components/TrustedBy";
import CourseWhatWeLearn from "./_components/CourseWhatWeLearn";
import CourseCurriculum from "./_components/CourseCurriculum";
import CourseToolsMaster from "./_components/CourseToolsMaster";
import CourseSuccessStories from "./_components/CourseSuccessStories";
import CourseMentor from "./_components/CourseMentor";
import CourseIncluded from "./_components/CourseIncluded";
import ProductsFaq from "../products/_components/ProductsFaq";

const COURSE_FAQS = [
  {
    question: "Who is this course for?",
    answer: "This course is designed for beginners, freelancers, students, and professionals who want to learn practical skills and apply them to real-world projects.",
  },
  {
    question: "Do I need prior experience?",
    answer: "No prior experience is required. We start from the basics and gradually move to advanced techniques, making it suitable for complete beginners and intermediate editors alike.",
  },
  {
    question: "How will I access the course?",
    answer: "After enrollment you'll get instant lifetime access to the course platform. All lessons, assets, and project files are available 24/7 on any device.",
  },
  {
    question: "Can I learn at my own pace?",
    answer: "Absolutely! The course is fully self-paced. You can start, pause, and resume at any time. There are no deadlines or time limits.",
  },
];

export default function CoursePage() {
  return (
    <>
      <CourseHero />
      <TrustedBy />
      <CourseWhatWeLearn />
      <CourseCurriculum />
      <CourseToolsMaster />
      <CourseSuccessStories />
      <CourseMentor />
      <CourseIncluded />
      <ProductsFaq faqs={COURSE_FAQS} gradientIdPrefix="course" />
    </>
  );
}
