"use client";

import { logout } from "@/actions/logout";
import { useClickOutside } from "@/hooks/useClickOutside";
import { profilePopoverProps } from "@/types/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { IoMdContact as ContactIcon } from "react-icons/io";

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
      onClick={toggleOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="w-full flex justify-center items-center gap-2 px-2">
        <ContactIcon className="text-3xl" />
        <p className="text-xs font-semibold lg:block hidden">Welcome {name}</p>
      </div>

      <div
        className={`absolute top-0 right-0 lg:left-0  bg-gray-700 bg-opacity-85 lg:w-full w-[140px] text-gray-200 rounded-b-[5px] px-2 py-2 flex flex-col justify-start items-center gap-2 transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 translate-y-[40px] pointer-events-auto" : "opacity-0 translate-y-[20px] pointer-events-none"}`}>
        <hr className="border border-gray-400 w-full" />
        {pathname !== "/profile" && (
          <Link
            className="text-xs font-semibold hover:bg-gray-700 w-full p-1 text-center"
            href={"/profile"}>
            Profile
          </Link>
        )}
        <button
          className="text-xs font-semibold hover:bg-gray-700 w-full p-1 text-center disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSignOut}
          disabled={isLoggingOut}>
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePopover;
