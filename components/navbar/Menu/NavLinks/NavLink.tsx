"use client";
import { navLinkProps } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.css";

const NavLink = ({ title, href }: navLinkProps) => {
  const pathname = usePathname();
  const visibilityClass = pathname === href ? styles.hidden : styles.inlineBlock;
  const colorClass = title === "Paddy Field" ? styles.green : "";

  return (
    <Link
      href={href}
      className={`${styles.link} ${visibilityClass} ${colorClass}`}>
      {title}
    </Link>
  );
};

export default NavLink;
