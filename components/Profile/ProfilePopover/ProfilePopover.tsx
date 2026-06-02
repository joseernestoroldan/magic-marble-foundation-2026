"use client";

import { logout } from "@/actions/logout";
import { useClickOutside } from "@/hooks/useClickOutside";
import { profilePopoverProps } from "@/types/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { IoMdContact as ContactIcon } from "react-icons/io";
import styles from "./ProfilePopover.module.css";

const ProfilePopover = ({ name }: profilePopoverProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

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
  const handleMouseEnter = useCallback(() => setIsOpen(true), []);
  const handleMouseLeave = useCallback(() => setIsOpen(false), []);

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  if (!name) {
    return (
      <Link
        className={styles.loginLink}
        href={"/login"}>
        Login
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.trigger} ${isOpen ? styles.triggerRoundedTop : styles.triggerRounded}`}
      onClick={toggleOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className={styles.triggerContent}>
        <ContactIcon className={styles.contactIcon} />
        <p className={styles.welcomeText}>Welcome {name}</p>
      </div>

      <div
        className={`${styles.popover} ${isOpen ? styles.popoverOpen : styles.popoverClosed}`}>
        <hr className={styles.divider} />
        {pathname !== "/profile" && (
          <Link
            className={styles.popoverLink}
            href={"/profile"}>
            Profile
          </Link>
        )}
        <button
          className={styles.popoverButton}
          onClick={handleSignOut}
          disabled={isLoggingOut}>
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePopover;
