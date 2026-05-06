"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoMdContact as ContactIcon } from "react-icons/io";
import Link from "next/link";
import { logout } from "@/actions/logout";
import { profilePopoverProps } from "@/types/types";

const ProfilePopover = ({ name }: profilePopoverProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { push, refresh } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await logout();
    push("/");
    refresh();
  };

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  if (!name) {
    return (
      <Link
        className="w-full font-semibold text-sm rounded-[5px] flex flex-col justify-center items-center cursor-pointer h-[40px] bg-gray-700 text-gray-200 hover:bg-opacity-60"
        href={"/login"}>
        Login
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`lg:w-full w-[40px] flex flex-col justify-center items-center cursor-pointer h-[40px] relative bg-gray-700 hover:bg-opacity-60 text-gray-200 ${isOpen ? "rounded-t-[5px]" : "rounded-[5px]"}`}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}>
      <div className="w-full flex justify-center items-center gap-2 px-2">
        <ContactIcon className="text-3xl" />
        <p className="text-xs font-semibold lg:block hidden">Welcome {name}</p>
      </div>

      <div
        className={`absolute top-0 right-0 lg:left-0  bg-gray-700 bg-opacity-85 lg:w-full w-[120px] text-gray-200 rounded-b-[5px] px-2 py-2 flex flex-col justify-start items-center gap-2 transition-all duration-1000 ease-in-out ${isOpen ? "opacity-100 translate-y-[40px] pointer-events-auto" : "opacity-0 translate-y-[20px] pointer-events-none"}`}>
        <hr className="border border-gray-400 w-full" />
        {pathname !== "/profile" && (
          <Link
            className="text-xs font-semibold hover:bg-gray-700 w-full p-1 text-center"
            href={"/profile"}>
            Profile
          </Link>
        )}
        <button
          className="text-xs font-semibold hover:bg-gray-700 w-full p-1 text-center"
          onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfilePopover;
