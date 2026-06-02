"use client";

import { logout } from "@/actions/logout";
import { useClickOutside } from "@/hooks/useClickOutside";
import { profilePopoverProps } from "@/types/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import {
  IoMdContact as ContactIcon,
  IoMdPerson as ProfileIcon,
  IoMdLogOut as LogoutIcon,
  IoMdArrowDropdown as ChevronDown,
} from "react-icons/io";
import styles from "./ProfilePopover.module.css";

const ProfilePopover = ({ name }: profilePopoverProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const containerRef = useClickOutside<HTMLDivElement>(
    useCallback(() => setIsOpen(false), [])
  );
  const { push, refresh } = useRouter();
  const pathname = usePathname();

  const handleSignOut = useCallback(async () => {
    setIsLoggingOut(true);
    await logout();
    push("/");
    refresh();
    setIsLoggingOut(false);
  }, [push, refresh]);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    cancelClose();
    setIsOpen(true);
  }, [cancelClose]);

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  }, []);

  const initial = name?.[0]?.toUpperCase() ?? "?";

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  if (!name) {
    return (
      <Link className={styles.loginLink} href="/login">
        <ContactIcon className={styles.loginIcon} />
        <span>Login</span>
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.wrapper} ${isOpen ? styles.wrapperOpen : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
        onClick={toggleOpen}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <ContactIcon className={styles.contactIcon} />
        <span className={styles.triggerName}>{name}</span>
        <ChevronDown
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
        />
      </button>

      <div
        className={`${styles.popover} ${isOpen ? styles.popoverOpen : styles.popoverClosed}`}
        role="menu"
        onMouseEnter={cancelClose}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.popoverHeader}>
          <div className={styles.popoverUserInfo}>
            <span className={styles.popoverName}>{name}</span>
            <span className={styles.popoverLabel}>Profile</span>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.popoverBody}>
          {pathname !== "/profile" && (
            <Link
              className={styles.menuItem}
              href="/profile"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <ProfileIcon className={styles.menuIcon} />
              <span>View Profile</span>
            </Link>
          )}

          <button
            className={styles.signOutButton}
            onClick={handleSignOut}
            disabled={isLoggingOut}
            type="button"
            role="menuitem"
          >
            <LogoutIcon className={styles.menuIcon} />
            <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopover;
