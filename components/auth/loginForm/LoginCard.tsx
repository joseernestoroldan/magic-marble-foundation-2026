import Link from "next/link";
import Separator from "../separator/Separator";
import LoginForm from "./LoginForm";
import LoginGoogle from "./LoginGoogle";
import styles from "./LoginCard.module.css";

const heading = (
  <h2 className={styles.title}>Welcome back to Magic Marble Foundation</h2>
);

const registerSection = (
  <div className={styles.registerRow}>
    <p className={styles.registerText}>New in Magic Marble Foundation?</p>
    <Link href={"/register"} className={styles.registerLink}>
      Create Account
    </Link>
  </div>
);

const LoginCard = () => {
  return (
    <div className={styles.card}>
      {heading}

      <LoginForm />
      <Separator title="Or" />

      <div className={styles.socialSection}>
        <LoginGoogle />
      </div>

      {registerSection}
    </div>
  );
};

export default LoginCard;
