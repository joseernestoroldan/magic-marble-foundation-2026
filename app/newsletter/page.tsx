import { getAllChimp } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import NewsletterList from "@/components/Newsletter/NewsletterList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | Magic Marble Foundation",
  description:
    "Stay up to date with the Magic Marble Foundation. Browse our newsletter archive for the latest updates, stories, and initiatives.",
};

import styles from "./page.module.css";

const NewsletterPage = async () => {
  const chimpData = await getAllChimp();

  // Filter entries that have a chimpLink
  const newsletters = chimpData?.filter((item) => item.chimpLink) ?? [];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Our Newsletter
      </h2>
      <Container>
        {newsletters.length > 0 ? (
          <NewsletterList newsletters={newsletters} />
        ) : (
          <p className={styles.emptyState}>
            No newsletters available yet.
          </p>
        )}
      </Container>
    </div>
  );
};

export default NewsletterPage;