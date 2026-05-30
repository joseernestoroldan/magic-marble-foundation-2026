import VerificationForm from '@/components/verificationForm/VerificationForm'
import styles from "./page.module.css";

const NewVerificationPage = () => {
  return (
    <div className={styles.wrapper}>
        <VerificationForm/>
    </div>
  )
}

export default NewVerificationPage