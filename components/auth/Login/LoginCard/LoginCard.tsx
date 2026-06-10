import Link from "next/link";
import Separator from "@/components/auth/Separator/Separator";
import LoginForm from "@/components/auth/Login/LoginForm/LoginForm";
import LoginGoogle from "@/components/auth/Login/LoginGoogle/LoginGoogle";
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
