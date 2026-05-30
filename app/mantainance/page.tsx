import styles from "./page.module.css";

const PaddyFieldMaintenancePage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          This page is under maintenance
        </h1>
        <p className={styles.description}>
          We are currently working on improvements. Please check back later.
        </p>
        <div className={styles.iconWrapper}>
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v4m0 8v4m4-4h4m-8 0H4m4-4H4m8 0h4m-4-4V4m0 8v4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PaddyFieldMaintenancePage;