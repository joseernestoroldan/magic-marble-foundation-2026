import styles from "./page.module.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import HeroSection from "@/components/Home/HeroSection/HeroSection";
import MagicDiaries from "@/components/Home/MagicDiaries/MagicDiaries";
import MagicFrame from "@/components/Home/MagicFrame/MagicFrame";
import OurMission from "@/components/Home/OurMission/OurMission";
import OurProjects from "@/components/Home/OurProjects/OurProjects";
import SectionSkeleton from "@/components/Layouts/SectionSkeleton/SectionSkeleton";

const Banner = dynamic(() => import("@/components/Home/Banner/Banner"));
const FadeInOutCarousel = dynamic(
  () => import("@/components/Home/FadeInOutCarousel/FadeInOutCarousel"),
);
const OurPartners = dynamic(
  () => import("@/components/Home/OurPartners/OurPartners"),
);

export const metadata: Metadata = {
  title: "Magic Marble Foundation",
  description:
    "Empowering communities, promoting animal welfare, and championing environmental activism. Join us in creating a compassionate global community.",
  openGraph: {
    title: "Magic Marble Foundation",
    description: "Mobilize Empathy For All Species And The World We Share.",
    type: "website",
  },
};

const HomePage = async () => {
  return (
    <article className={styles.article}>
      <HeroSection />
      <OurMission />

      <Suspense fallback={<SectionSkeleton />}>
        <MagicDiaries />
      </Suspense>

      <MagicFrame />

      <Banner />

      <Suspense fallback={<SectionSkeleton />}>
        <OurProjects />
      </Suspense>

      <FadeInOutCarousel />
      <OurPartners />
    </article>
  );
};

export default HomePage;
