"use client";
import { sigInGoogle } from "@/actions/signInGoogle";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import styles from "./LoginGoogle.module.css";

const oauthErrorBox = (
  <div className={styles.errorBox}>
    <p>Your email is already register with other credentials</p>
    <p>Please try either other email or other method!</p>
  </div>
);

const LoginGoogle = () => {
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error") ?? "1";

  const handleSignIn = () => sigInGoogle();

  return (
    <div className={styles.wrapper}>
      <button
        onClick={handleSignIn}
        className={styles.googleButton}
      >
        <FcGoogle className={styles.googleIcon} />
        Sign in with Google
      </button>
      {oauthError === "OAuthAccountNotLinked" && oauthErrorBox}
    </div>
  );
};

export default LoginGoogle;
