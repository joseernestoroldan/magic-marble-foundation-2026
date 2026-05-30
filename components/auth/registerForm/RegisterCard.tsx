import Link from "next/link";
import LoginGoogle from "../loginForm/LoginGoogle";
import Separator from "../separator/Separator";
import RegisterForm from "./RegisterForm";
import styles from "./RegisterCard.module.css";

const RegisterCard = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        Welcome to Magic Marble Foundation
      </h2>

      <RegisterForm />

      <Separator title="Or" />

      <div className={styles.socialRow}>
        <LoginGoogle/>
      </div>

      <p className={styles.loginText}>
        Already have an Account?{" "}
        <Link href={"/login"} className={styles.loginLink}>
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterCard;
