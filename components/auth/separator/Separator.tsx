import { memo } from "react";
import styles from "./Separator.module.css";

type SeparatorProps = {
    title: string
}

const Separator = memo(({title}: SeparatorProps) => {
  return (
    <div className={styles.wrapper}>
        <p className={styles.label}>{title}</p>
    </div>
  )
})

export default Separator