import type { Metadata } from "next";
import dynamic from "next/dynamic";

import AboutUs from "@/components/About/AboutUs/AboutUs";
import styles from "./page.module.css";

const FocusAreas = dynamic(() => import("@/components/About/FocusAreas/FocusAreas"));
const OurTeam = dynamic(() => import("@/components/About/OurTeam/OurTeam"));
const OurValues = dynamic(() => import("@/components/About/OurValues/OurValues"));
const FadeInOutCarausel = dynamic(() => import("@/components/Home/FadeInOutCarousel/FadeInOutCarausel"));
const OurMIssion = dynamic(() => import("@/components/Home/OurMission/OurMIssion"));
const VideoFrame = dynamic(() => import("@/components/VideoFrame/VideoFrame"));

export const metadata: Metadata = {
  title: "Magic Marble Foundation — About Us",
  description:
    "Learn about the Magic Marble Foundation, our mission, values, and the team dedicated to making a positive impact on all species and the world we share.",
  openGraph: {
    title: "Magic Marble Foundation — About Us",
    description: "Learn about the Magic Marble Foundation, our mission, values, and the team.",
    type: "website",
  },
};

const AboutUsPage = () => {
  return (
    <article className={styles.article}>
      <AboutUs />
      <FocusAreas />
      <OurMIssion />
      <VideoFrame src="https://www.youtube.com/embed/ipNTJWiKR5Q?autoplay=1&mute=1" />
      <OurValues />
      <FadeInOutCarausel />
      <OurTeam />
    </article>
  );
};

export default AboutUsPage;
