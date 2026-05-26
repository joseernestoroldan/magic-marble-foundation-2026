"use client";
import NavLink from '@/components/Navbar/NavLink';
import { useClickOutside } from "@/hooks/useClickOutside";
import { navDropdownProps } from "@/types/types";
import { PointerEvent, useCallback, useState } from "react";

const NavDropdown = ({ title, menu }: navDropdownProps) => {
  const [open, setOpen] = useState(false);

  const containerRef = useClickOutside<HTMLDivElement>(
    useCallback(() => setOpen(false), []),
  );

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);
  const handlePointerEnter = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") {
      setOpen(true);
    }
  }, []);
  const handlePointerLeave = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") {
      setOpen(false);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-nowrap cursor-pointer hover:drop-shadow-md rounded-[5px] text-cyan-600 hover:text-gray-500 text-lg font-bold relative"
      onClick={toggleOpen}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}>
      {title}
      {open && (
        <div className="absolute z-20 top-full pt-[38px] bg-red-transparent left-1/2 -translate-x-1/2 w-[300px] p-1 flex justify-center items-center">
          <div className="w-full h-full bg-black/60 text-white backdrop-blur-md rounded-[5px] shadow-lg min-w-48 p-2 z-20 flex flex-col gap-1">
            {menu.map((item) => (
              <NavLink key={item.title} title={item.title} href={item.href} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
