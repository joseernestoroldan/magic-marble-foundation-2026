import NewPasswordForm from '@/components/auth/newPasswordForm/NewPasswordForm'
import styles from "./page.module.css";

const NewPasswordPage = () => {
  return (
    <div className={styles.wrapper}>
        <NewPasswordForm/>
    </div>
    
  )
}

export default NewPasswordPage