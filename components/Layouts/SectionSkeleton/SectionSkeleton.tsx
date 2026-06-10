import styles from "./SectionSkeleton.module.css";

const SectionSkeleton = () => (
    <div className={styles.wrapper}>
      <div className={styles.pulse} />
    </div>
  );

  export default SectionSkeleton