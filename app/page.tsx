import HeroSection from "@/components/Home/HeroSection/HeroSection";
import OurMIssion from "@/components/Home/OurMission/OurMIssion";
import MagicDiaries from "@/components/Home/MagicDiaries/MagicDiaries";
import MagicFrame from "@/components/Home/MagicFrame/MagicFrame";
import Banner from "@/components/Home/Banner/Banner";
import OurProjects from "@/components/ourprojects/OurProjects";



const HomePage = async () => {
  // const projects: QueryType[] | null = await getOrderedData("projects", "5");


  return (
    <div className="w-full flex-col justify-center items-center space-y-24 overflow-hidden">
      <HeroSection/>
      <OurMIssion/>
      <MagicDiaries/>
      <MagicFrame/>
      <Banner/>
      <OurProjects/>


    </div>
  );
};

export default HomePage;



















      {/* <ParallaxContainer bgImage="bg-map.png" opacity="0.1">
        <BannerParallax
          title="Our Mission"
          message="To Mobilize Empathy for all species and the world we share"
          bg="bg-cyan-200"
          justify="text-center"
        />
      </ParallaxContainer> */}

      {/* {diaries && <GridDIaries diaries={diaries} />} */}

      {/* <MagicFrame bg="bg-white" />
      <ParallaxContainer bgImage="bg-map.png" opacity="0.1">
        <BannerParallax
          title=""
          message="At the Magic Marble Foundation, we are a dedicated team of
                individuals striving to create a better world through empathy
                and action. Our organization is committed to empowering
                underserved communities, promoting animal welfare, and
                championing environmental activism. Together, we work diligently
                to cultivate a compassionate global community that respects and
                values all living beings and the environment we share."
          bg="bg-cyan-300"
          justify="text-justify indent-6"
        />
      </ParallaxContainer>

      <OurProjects bg="bg-white" color="text-gray-800" projects={projects} />

      <Donations />

      <OurPartners /> */}