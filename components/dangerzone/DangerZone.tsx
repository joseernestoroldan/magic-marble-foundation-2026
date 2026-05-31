"use client";
import { DeleteAccount } from "@/actions/delete";
import { logout } from "@/actions/logout";
import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";
import styles from "./DangerZone.module.css";

const DangerZone = ({ data }: any) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      const result = await DeleteAccount(data.data.id);
      if (result.success) {
        await logout();
      } else {
        setError("Failed to delete account. Please try again.");
        setIsDeleting(false);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <IoWarningOutline className={styles.warningIcon} />
        <h3 className={styles.title}>Danger Zone</h3>
      </div>

      <p className={styles.description}>
        Deleting your account is permanent and cannot be undone. All your data,
        including your profile, orders, and preferences, will be permanently
        removed from our servers.
      </p>

      {error && (
        <div className={styles.errorBox}>
          {error}
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        className={styles.deleteButton}
      >
        Delete Account
      </button>

      {open && (
        <>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(16px) scale(0.98); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
          <div
            className={styles.overlay}
            style={{ animation: "fadeIn 0.2s ease-out" }}
            onClick={() => {
              if (!isDeleting) setOpen(false);
            }}
          >
            <div
              className={styles.modal}
              style={{ animation: "slideUp 0.2s ease-out" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalBody}>
                <div className={styles.iconBox}>
                  <IoWarningOutline className={styles.modalIcon} />
                </div>
                <h2 className={styles.modalTitle}>
                  Are you absolutely sure?
                </h2>
                <p className={styles.modalText}>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </p>
              </div>

              <div className={styles.modalFooter}>
                <button
                  onClick={() => setOpen(false)}
                  disabled={isDeleting}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={styles.confirmButton}
                >
                  {isDeleting ? (
                    <>
                      <ImSpinner9 className={styles.spinner} />
                      Deleting...
                    </>
                  ) : (
                    "Delete Account"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DangerZone;
