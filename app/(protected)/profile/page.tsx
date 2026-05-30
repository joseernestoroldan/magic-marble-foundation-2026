import { auth, signOut } from "@/auth";
import { getAllData } from "@/client";
import Donators from "@/components/donators/Donators";
import NotifyDiaries from "@/components/notifyDiaries/NotifyDiaries";
import ShowUsersList from "@/components/showUsersList/ShowUsersList";
import { db } from "@/db";
import Link from "next/link";
import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaGlobeAmericas } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdSettings } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import styles from "./page.module.css";

const ProfilePage = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const role = session?.user.role === "ADMIN";

  // Parallel fetch: user data and diaries at the same time
  const [data, diaries] = await Promise.all([
    db.user.findFirst({ where: { id: userId } }),
    getAllData("dairies"),
  ]);

  if (!data) {
    return (
      <div className={styles.notFoundWrapper}>
        <div className={styles.notFoundCard}>
          <div className={styles.notFoundIconWrapper}>
            <FaUser className={styles.notFoundIcon} />
          </div>
          <h2 className={styles.notFoundTitle}>User profile not found</h2>
          <p className={styles.notFoundText}>We couldn&apos;t locate your profile. Please try signing in again.</p>
          <Link
            href="/login"
            className={styles.notFoundLink}
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const displayName = data.name
    ? data.name
    : `${data.firstName ?? ""} ${data.secondName ?? ""}`.trim();

  const initials = data.name
    ? data.name.charAt(0).toUpperCase()
    : `${(data.firstName ?? "").charAt(0)}${(data.secondName ?? "").charAt(0)}`.toUpperCase();

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Profile</h1>
        <Link
          href="/settings"
          className={styles.settingsLink}
        >
          <IoMdSettings className={styles.settingsIcon} />
          Settings
        </Link>
      </div>

      {/* User Identity Card */}
      <div className={styles.userCard}>
        <div className={styles.avatar}>
          <span className={styles.initials}>{initials}</span>
        </div>
        <div className={styles.userInfo}>
          <h2 className={styles.displayName}>
            {displayName}
          </h2>
          <div className={styles.emailRow}>
            <p className={styles.emailText}>{data.email}</p>
            {data.name ? <FcGoogle className={styles.googleIcon} /> : null}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      {(data.country || data.address || data.number) ? (
        <div className={styles.infoGrid}>
          {data.country ? (
            <div className={styles.infoItem}>
              <div className={styles.infoIconWrapper}>
                <FaGlobeAmericas className={styles.infoIcon} />
              </div>
              <div className={styles.infoContent}>
                <p className={styles.infoLabel}>Country</p>
                <p className={styles.infoValue}>{data.country}</p>
              </div>
            </div>
          ) : null}

          {data.address ? (
            <div className={styles.infoItem}>
              <div className={styles.infoIconWrapper}>
                <FaMapMarkerAlt className={styles.infoIcon} />
              </div>
              <div className={styles.infoContent}>
                <p className={styles.infoLabel}>Address</p>
                <p className={styles.infoValue}>{data.address}</p>
              </div>
            </div>
          ) : null}

          {data.number ? (
            <div className={styles.infoItem}>
              <div className={styles.infoIconWrapper}>
                <FaPhoneAlt className={styles.infoIcon} />
              </div>
              <div className={styles.infoContent}>
                <p className={styles.infoLabel}>Telephone</p>
                <p className={styles.infoValue}>
                  {data.codeNumber ? `(${data.codeNumber}) ` : ""}{data.number}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Status Badges */}
      <div className={styles.badgeWrapper}>
        {data.emailVerified ? (
          <span className={`${styles.badge} ${styles.badgeVerified}`}>
            <MdVerifiedUser className={styles.badgeIconLg} />
            Verified
          </span>
        ) : null}

        {data.role === "ADMIN" ? (
          <span className={`${styles.badge} ${styles.badgeAdmin}`}>
            <RiAdminFill className={styles.badgeIconLg} />
            Admin
          </span>
        ) : (
          <span className={`${styles.badge} ${styles.badgeUser}`}>
            <FaUser className={styles.badgeIconSm} />
            User
          </span>
        )}
      </div>

      {/* Sign Out */}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          className={styles.signOutButton}
          type="submit"
        >
          Sign Out
        </button>
      </form>

      {/* Admin Sections */}
      {role ? (
        <section className={styles.adminSection}>
          <ShowUsersList />
          <NotifyDiaries diaries={diaries} />
          <Donators />
        </section>
      ) : null}
    </div>
  );
};

export default ProfilePage;
