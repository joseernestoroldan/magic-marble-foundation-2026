import dynamic from "next/dynamic";
import Documents from "@/components/Financials/Documents";

import styles from "./page.module.css";

const Charts = dynamic(() => import("@/components/Financials/Charts"));

const FinancialsPage = async () => {
  return (
    <div className={styles.wrapper}>
      <Charts />
      <Documents />
    </div>
  );
};
export default FinancialsPage;
