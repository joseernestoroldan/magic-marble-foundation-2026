import HeroSection from "@/components/Home/HeroSection/HeroSection";
import OurMIssion from "@/components/Home/OurMission/OurMIssion";
import MagicDiaries from "@/components/Home/MagicDiaries/MagicDiaries";
import MagicFrame from "@/components/Home/MagicFrame/MagicFrame";
import Banner from "@/components/Home/Banner/Banner";
import OurProjects from "@/components/Home/OurProjects/OurProjects";
import FadeInOutCarausel from "@/components/Home/FadeInOutCarousel/FadeInOutCarausel";
import OurPartners from "@/components/ourpartners/OurPartners";

const HomePage = async () => {
  return (
    <div className="w-full flex-col justify-center items-center space-y-24 overflow-hidden">
      <HeroSection />
      <OurMIssion />
      <MagicDiaries />
      <MagicFrame />
      <Banner />
      <OurProjects />
      <FadeInOutCarausel />
      <OurPartners />
    </div>
  );
};

export default HomePage;
