import { FileQuestion } from "lucide-react"
import Link from "next/link"
import styles from "./not-found.module.css"

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <FileQuestion className={styles.icon} />
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.description}>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <div className={styles.actions}>
          <Link
            href="/"
            className={styles.homeLink}
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}

