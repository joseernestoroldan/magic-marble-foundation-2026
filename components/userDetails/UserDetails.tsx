"use client";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  MdOutlineUnsubscribe,
  MdUnsubscribe,
  MdVerifiedUser,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { useState } from "react";
import styles from "./UserDetails.module.css";

type UserDetailsProps = {
  name?: string | null;
  firstName?: string | null;
  secondName?: string | null;
  email?: string | null;
  country?: string | null;
  address?: string | null;
  codeNumber?: string | null;
  number?: string | null;
  subscribed?: boolean | null;
  emailVerified?: Date | null;
  role: "ADMIN" | "USER";
};

const UserDetails = ({
  name,
  firstName,
  secondName,
  email,
  country,
  address,
  codeNumber,
  number,
  subscribed,
  emailVerified,
  role,
}: UserDetailsProps) => {
  const [open, setOpen] = useState(false);

  const displayName = name
    ? name
    : `${firstName ?? ""} ${secondName ?? ""}`.trim();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={styles.detailsBtn}
      >
        Details
      </button>

      {open ? (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
        >
          <div
            className={styles.card}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.headerTitle}>User Details</h2>
              <button
                onClick={() => setOpen(false)}
                className={styles.closeBtn}
              >
                &times;
              </button>
            </div>

            {/* Name Section */}
            <div className={styles.nameSection}>
              <h3 className={styles.displayName}>
                {displayName}
              </h3>
              <div className={styles.emailRow}>
                <p className={styles.emailText}>{email}</p>
                {name ? <FcGoogle className={styles.googleIcon} /> : null}
              </div>
            </div>

            {/* Info Rows */}
            <div className={styles.infoRows}>
              {country ? (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Country</span>
                  <span className={styles.infoValueCapitalize}>{country}</span>
                </div>
              ) : null}

              {address ? (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Address</span>
                  <span className={styles.infoValueCapitalize}>{address}</span>
                </div>
              ) : null}

              {number ? (
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Telephone</span>
                  <span className={styles.infoValue}>
                    {codeNumber ? `(${codeNumber}) ` : ""}{number}
                  </span>
                </div>
              ) : null}
            </div>

            {/* Status Badges */}
            <div className={styles.badges}>
              {emailVerified ? (
                <span className={`${styles.badge} ${styles.badgeVerified}`}>
                  <MdVerifiedUser className={styles.badgeIcon} />
                  Verified
                </span>
              ) : null}

              {role === "ADMIN" ? (
                <span className={`${styles.badge} ${styles.badgeAdmin}`}>
                  <RiAdminFill className={styles.badgeIcon} />
                  Admin
                </span>
              ) : (
                <span className={`${styles.badge} ${styles.badgeUser}`}>
                  <FaUser className={styles.badgeIconXs} />
                  User
                </span>
              )}

              {subscribed ? (
                <span className={`${styles.badge} ${styles.badgeSubscribed}`}>
                  <MdUnsubscribe className={styles.badgeIcon} />
                  Subscribed
                </span>
              ) : (
                <span className={`${styles.badge} ${styles.badgeNotSubscribed}`}>
                  <MdOutlineUnsubscribe className={styles.badgeIcon} />
                  Not Subscribed
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserDetails;
