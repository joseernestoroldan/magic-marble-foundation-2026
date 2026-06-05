"use client";

import Container from "@/components/Layouts/Container/Container";
import Paypal from "@/components/payments/paypal";
import Venmo from "@/components/payments/venmo";
import SmokeText from "@/components/SmokeText/SmokeText";
import VideoFrame from "@/components/VideoFrame/VideoFrame";
import { Playfair_Display } from "next/font/google";
import styles from "./page.module.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const DonationsPage = () => {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.titleWrapper}>
          <SmokeText
            text="Help Us Help Them"
            className={`${styles.smokeText} ${playfair.className}`}
            staggerMs={80}
          />
        </div>

        <div className={styles.card}>
          {/* Video Section */}
          <div className={styles.videoSection}>
            <VideoFrame src="https://www.youtube.com/embed/y2xP3mCkCSU?autoplay=1&mute=1" />
          </div>

          {/* Content & Donation Section */}
          <div className={styles.contentSection}>
            <h2 className={`${styles.sectionTitle} ${playfair.className}`}>
              Every Penny Counts
            </h2>
            <p className={styles.description}>
              Your donation is 100% dedicated to those we serve, whether they
              are humans in need of food, medical care, or education, or
              non-human animals in need of rescue, sterilization, and advocacy.
              With our commitment to zero administrative salaries and minimal
              overhead costs, we guarantee that your contribution will make a
              tangible difference. Join us in making a real impact in the lives
              of those who need it most.
            </p>

            <div className={styles.buttonGroup}>
              <div className={styles.buttonWrapper}>
                <Paypal />
              </div>
              <div className={styles.buttonWrapper}>
                <Venmo />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DonationsPage;
