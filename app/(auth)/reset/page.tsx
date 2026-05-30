import ResetForm from '@/components/auth/resetForm/resetForm'
import styles from "./page.module.css";

const ResetPage = async () => {
  
  return (
    <div className={styles.wrapper}>
        <ResetForm/>
    </div>
    
  )
}

export default ResetPage