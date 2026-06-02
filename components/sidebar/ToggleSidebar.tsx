"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { menuItems } from "@/utils/menuItems";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styles from "./ToggleSidebar.module.css";

// React Icons
import { FaBook, FaHandHoldingHeart, FaProjectDiagram } from "react-icons/fa";
import { GiThreeLeaves } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdHome } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import {
  MdChildCare,
  MdGroups,
  MdNewspaper,
  MdOutlineVolunteerActivism,
  MdPhotoLibrary,
  MdPrivacyTip,
} from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import { IoLogoWhatsapp, IoMdMail } from "react-icons/io";

/** Map each menu-item title to an appropriate icon */
const iconMap: Record<string, React.ReactNode> = {
  Home: <IoMdHome size={20} />,
  Projects: <FaProjectDiagram size={18} />,
  "About Us": <MdGroups size={20} />,
  Financials: <GrMoney size={18} />,
  Newsletter: <MdNewspaper size={18} />,
  "Privacy Policy": <MdPrivacyTip size={18} />,
  Gallery: <MdPhotoLibrary size={18} />,
  Adopt: <MdChildCare size={20} />,
  Sponsor: <FaHandHoldingHeart size={18} />,
  "Paddy Field": <GiThreeLeaves size={18} />,
  "Magic Diaries": <FaBook size={18} />,
  "Join Us": <MdOutlineVolunteerActivism size={20} />,
  "Our Grantees": <FaHandshakeSimple size={18} />,
};

const ToggleSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [close]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sidebarRef = useClickOutside<HTMLDivElement>(close);

  return (
    <>
      {/* Hamburger button — only visible below lg */}
      <button
        onClick={toggle}
        aria-label="Open navigation menu"
        className={styles.hamburger}
      >
        <HiMenuAlt2 size={28} />
      </button>

      {/* Backdrop overlay */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : styles.backdropClosed}`}
      />

      {/* Sidebar panel */}
      <div
        ref={sidebarRef}
        className={`${styles.panel} ${isOpen ? styles.panelOpen : styles.panelClosed}`}
      >
        {/* Header: logo + close button */}
        <div className={styles.header}>
          <Link href="/" onClick={close} className={styles.logoLink}>
            <div className={styles.logoImage}>
              <Image
                fill
                src="/logos/navlogo.png"
                alt="Magic Marble Foundation"
                sizes="50px"
                priority
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoLine}>
                Magic
              </span>
              <span className={styles.logoLineAccent}>
                Marble
              </span>
              <span className={styles.logoLine}>
                Foundation
              </span>
            </div>
          </Link>

          <button
            onClick={close}
            aria-label="Close navigation menu"
            className={styles.closeBtn}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Menu items */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {menuItems.map((item, index) => (
              <li
                key={item.title}
                style={{
                  transitionDelay: isOpen ? `${60 + index * 30}ms` : "0ms",
                }}
                className={`${styles.navItem} ${isOpen ? styles.navItemVisible : styles.navItemHidden}`}
              >
                <Link
                  href={item.link}
                  onClick={close}
                  className={styles.navLink}
                >
                  <span className={styles.navIcon}>
                    {iconMap[item.title] ?? <IoMdHome size={18} />}
                  </span>
                  <span className={styles.navTitle}>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact info */}
        <div className={styles.contact}>
          <p className={styles.contactLabel}>
            Contact
          </p>

          <a
            href="https://wa.me/13126008182"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactLink} ${styles.contactLinkWhatsapp}`}
          >
            <IoLogoWhatsapp
              size={20}
              className={styles.contactIcon}
            />
            <span className={styles.contactText}>+1 312 - 600 - 8182</span>
          </a>

          <a
            href="mailto:info@magicmarblefoundation.org"
            className={`${styles.contactLink} ${styles.contactLinkEmail}`}
          >
            <IoMdMail
              size={20}
              className={styles.contactIcon}
            />
            <span className={styles.contactText}>info@magicmarblefoundation.org</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ToggleSidebar;