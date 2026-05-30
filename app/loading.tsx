import styles from "./loading.module.css";
import Loader from '@/components/Loader/Loader'

const loading = () => {
  return (
    <div className={styles.wrapper}>
        <Loader/>
    </div>
  )
}

export default loading