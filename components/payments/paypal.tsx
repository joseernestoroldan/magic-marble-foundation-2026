import Image from "next/image";
import Link from "next/link";
import styles from "./paypal.module.css";

const Paypal = () => {
  return (
    <Link href={"https://www.paypal.com/donate?hosted_button_id=8LVLMN3NBRABS"}>
      <div className={styles.card}>
        <button className={styles.paypalButton}>
          <Image src="/paypal.webp" width={20} height={20} alt="paypal" />
          <p className={styles.paypalText}>
            <span className={styles.pay}>Pay</span>
            <span className={styles.pal}>Pal</span>
          </p>
        </button>

        <div className={styles.divider}>
          <div className={styles.dividerLine}></div>
          <span className={styles.dividerText}>Or</span>
          <div className={styles.dividerLine}></div>
        </div>

        <p className={styles.creditCard}>
          Donate with your Credit or Debit Card
        </p>
      </div>
    </Link>
  );
};

export default Paypal;
