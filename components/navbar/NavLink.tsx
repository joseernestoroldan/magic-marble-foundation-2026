"use client";
import { navLinkProps } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ title, href }: navLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`${pathname === href ? "hidden" : "inline-block"} ${title === "Paddy Field" ? "text-green-600" : ""} text-nowrap cursor-pointer hover:drop-shadow-lg rounded-[5px] hover:text-gray-400 text-lg font-bold`}>
      {title}
    </Link>
  );
};

export default NavLink;
