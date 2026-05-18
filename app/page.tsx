import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import HeroSection from "@/components/Home/HeroSection/HeroSection";
import MagicDiaries from "@/components/Home/MagicDiaries/MagicDiaries";
import MagicFrame from "@/components/Home/MagicFrame/MagicFrame";
import OurMIssion from "@/components/Home/OurMission/OurMIssion";
import OurProjects from "@/components/Home/OurProjects/OurProjects";

const Banner = dynamic(() => import("@/components/Home/Banner/Banner"));
const FadeInOutCarausel = dynamic(() => import("@/components/Home/FadeInOutCarousel/FadeInOutCarausel"));
const OurPartners = dynamic(  () => import("@/components/Home/OurPartners/OurPartners"));

export const metadata: Metadata = {
  title: "Magic Marble Foundation — Home",
  description:
    "Empowering communities, promoting animal welfare, and championing environmental activism. Join us in creating a compassionate global community.",
  openGraph: {
    title: "Magic Marble Foundation",
    description: "Mobilize Empathy For All Species And The World We Share.",
    type: "website",
  },
};


const SectionSkeleton = () => (
  <div className="w-full flex justify-center items-center py-24">
    <div className="h-8 w-48 rounded-md bg-slate-800/50 animate-pulse" />
  </div>
);

const HomePage = async () => {
  return (
    <article className="w-full flex flex-col justify-center items-center space-y-24 overflow-hidden">
   
      <HeroSection />
      <OurMIssion />

    
      <Suspense fallback={<SectionSkeleton />}>
        <MagicDiaries />
      </Suspense>

      <MagicFrame />

      <Banner />

      <Suspense fallback={<SectionSkeleton />}>
        <OurProjects />
      </Suspense>

      <FadeInOutCarausel />
      <OurPartners />
    </article>
  );
};

export default HomePage;
