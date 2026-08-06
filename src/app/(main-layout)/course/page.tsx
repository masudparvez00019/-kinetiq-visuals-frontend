import CourseHero from "./_components/CourseHero";
import TrustedBy from "../(home)/_components/TrustedBy";
import CourseWhatWeLearn from "./_components/CourseWhatWeLearn";
import CourseCurriculum from "./_components/CourseCurriculum";
import CourseToolsMaster from "./_components/CourseToolsMaster";
import CourseSuccessStories from "./_components/CourseSuccessStories";
import CourseMentor from "./_components/CourseMentor";
import CourseIncluded from "./_components/CourseIncluded";
import ProductsFaq from "../products/_components/ProductsFaq";

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
      <ProductsFaq gradientIdPrefix="course" useCmsCourseFaq />
    </>
  );
}
