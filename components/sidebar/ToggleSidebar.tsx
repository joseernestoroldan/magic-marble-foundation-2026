"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { menuItems } from "@/utils/menuItems";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

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
// import { GiRiceSack } from "react-icons/gi";
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
        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg
                   text-cyan-600 hover:bg-cyan-50 active:scale-95
                   transition-all duration-200 cursor-pointer"
      >
        <HiMenuAlt2 size={28} />
      </button>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
                    transition-opacity duration-300 lg:hidden
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar panel */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 h-full w-[300px] max-w-[85vw]
                    bg-gradient-to-b from-white via-white to-cyan-50
                    shadow-2xl flex flex-col
                    transition-all duration-400 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] lg:hidden
                    ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
      >
        {/* Header: logo + close button */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-cyan-100">
          <Link href="/" onClick={close} className="flex items-center gap-3 group">
            <div className="w-[50px] h-[50px] relative shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                fill
                src="/navlogo.png"
                alt="Magic Marble Foundation"
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold uppercase text-gray-800 tracking-wide">
                Magic
              </span>
              <span className="text-sm font-semibold uppercase text-cyan-500 tracking-wide">
                Marble
              </span>
              <span className="text-sm font-semibold uppercase text-gray-800 tracking-wide">
                Foundation
              </span>
            </div>
          </Link>

          <button
            onClick={close}
            aria-label="Close navigation menu"
            className="flex items-center justify-center w-9 h-9 rounded-full
                       text-gray-500 hover:text-white hover:bg-cyan-500
                       transition-all duration-200 active:scale-90 cursor-pointer"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item, index) => (
              <li
                key={item.title}
                style={{
                  transitionDelay: isOpen ? `${60 + index * 30}ms` : "0ms",
                }}
                className={`transition-all duration-300
                            ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
              >
                <Link
                  href={item.link}
                  onClick={close}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                             text-gray-700 hover:text-cyan-600 hover:bg-cyan-50
                             transition-all duration-200 group"
                >
                  <span className="text-cyan-500 group-hover:text-cyan-600 transition-colors duration-200">
                    {iconMap[item.title] ?? <IoMdHome size={18} />}
                  </span>
                  <span className="text-[15px] font-medium">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact info */}
        <div className="border-t border-cyan-100 px-5 py-4 space-y-3">
          <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-2">
            Contact
          </p>

          <a
            href="https://wa.me/13126008182"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-green-600
                       transition-colors duration-200 group"
          >
            <IoLogoWhatsapp
              size={20}
              className="text-green-500 group-hover:text-green-600 transition-colors duration-200"
            />
            <span className="text-sm">+1 312 - 600 - 8182</span>
          </a>

          <a
            href="mailto:info@magicmarblefoundation.org"
            className="flex items-center gap-3 text-gray-600 hover:text-cyan-600
                       transition-colors duration-200 group"
          >
            <IoMdMail
              size={20}
              className="text-cyan-500 group-hover:text-cyan-600 transition-colors duration-200"
            />
            <span className="text-sm">info@magicmarblefoundation.org</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ToggleSidebar;