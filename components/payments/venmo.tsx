import Image from "next/image";
import Link from "next/link";
import styles from "./venmo.module.css";

const Venmo = () => {
  return (
    <Link
      href={
        "https://account.venmo.com/payment-link?recipients=magicmarble&txn=pay"
      
      }
      className={styles.wrapper}>
      <div className={styles.card}>
        <button className={styles.venmoButton}>
          <Image height={50} width={150} src="/payment-icons/venmo.webp" alt="paypal" />
        </button>
      </div>
    </Link>
  );
};

export default Venmo;
