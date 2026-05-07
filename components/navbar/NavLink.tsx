"use client";
import Link from "next/link";
import { navLinkProps } from "@/types/types";
import { usePathname } from "next/navigation";

const NavLink = ({ title, href }: navLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`${pathname === href ? "hidden" : "inline-block"} ${title === "Paddy Field" ? "text-green-400" : "text-cyan-500"} text-nowrap cursor-pointer hover:drop-shadow-lg rounded-lg hover:text-gray-500 text-lg font-medium`}>
      {title}
    </Link>
  );
};

export default NavLink;
