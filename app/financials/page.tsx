import Charts from "@/components/Financials/Charts";
import Documents from "@/components/Financials/Documents";

import styles from "./page.module.css";

const FinancialsPage = async () => {
  return (
    <div className={styles.wrapper}>
      <Charts />
      <Documents />
    </div>
  );
};
export default FinancialsPage;
