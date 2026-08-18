import Hero from '../components/Hero';
import VisionBanner from '../components/VisionBanner';
import Features from '../components/Features';
import HindiBenefits from '../components/HindiBenefits';
import TargetAudience from '../components/TargetAudience';
import Courses from '../components/Courses';
// import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';


interface HomePageProps {
  onOpenModal: (modal: string) => void;
}

export default function HomePage({ onOpenModal }: HomePageProps) {
  return (
    <>
      <Hero onOpenModal={onOpenModal} />
      <VisionBanner />
      <Features />
      <HindiBenefits />
      <TargetAudience onOpenModal={onOpenModal} />
      <Courses onOpenModal={onOpenModal} />
      {/* <HowItWorks /> */}
      <Testimonials  />
    </>
  );
}
