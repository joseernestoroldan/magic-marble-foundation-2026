import { signOut } from "@/auth";
import styles from "./SignOutForm.module.css";

const SignOutForm = () => (
  <form
    action={async () => {
      "use server";
      await signOut();
    }}
  >
    <button className={styles.button} type="submit">Sign Out</button>
  </form>
);

export default SignOutForm;
