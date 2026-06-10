import Link from "next/link";
import styles from "./DonationButton.module.css";

const DonationButton = () => {
  return (
    <Link href={"/donations"} className={styles.link}>
      Donate
    </Link>
  )
}

export default DonationButton 