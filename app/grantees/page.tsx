import { getAllGrantees } from "@/client";
import GranteesGrid from "@/components/Grantees/GranteesGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Grantees | Magic Marble Foundation",
  description:
    "Meet the organizations and partners supported by the Magic Marble Foundation.",
};

import styles from "./page.module.css";

const GranteesPage = async () => {
  const grantees = await getAllGrantees();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Our Grantees</h2>
      {grantees && grantees.length > 0 ? (
        <GranteesGrid grantees={grantees} />
      ) : (
        <p className={styles.emptyState}>No grantees available yet.</p>
      )}
    </div>
  );
};

export default GranteesPage;
