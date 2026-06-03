"use client";

import styles from "./global-error.module.css";
import { IoAlertCircle } from "react-icons/io5";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className={styles.page}>
          <div className={styles.center}>
            <IoAlertCircle className={styles.alertIcon} />
            <h1 className={styles.title}>
              Something went wrong
            </h1>
            <p className={styles.description}>
              We apologize for the inconvenience. Our team has been notified and
              is working on resolving the issue.
            </p>
            <div className={styles.actions}>
              <button
                onClick={reset}
                className={styles.retryButton}
              >
                Try again
              </button>
              <Link
                href="/"
                className={styles.homeLink}
              >
                Go back home <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
