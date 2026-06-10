"use client"

import styles from "./page.module.css";
import { AiOutlineLoading } from "react-icons/ai"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function UnderConstruction() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <AiOutlineLoading className={styles.spinnerIcon} />
          <h1 className={styles.mainTitle}>Under Construction</h1>
        </div>

        <p className={styles.subtitle}>
          We&apos;re working hard to bring you something amazing. Our team is putting the finishing touches on this
          page.
        </p>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={styles.loadingText}>Loading...</p>

        <div className={styles.buttonWrapper}>
          <Link
            href="/"
            className={styles.homeLink}
          >
            Return Home
          </Link>
        </div>

        <div className={styles.animationSection}>
          <div className={styles.animationBox}>
            <div className={styles.pingCircle}></div>
            <div className={styles.pulseCircle}></div>
            <div className={styles.spinningBorder}></div>
            <div className={styles.innerCircle}></div>
            <div className={styles.centerLabel}>
              <span className={styles.centerText}>COMING SOON</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

