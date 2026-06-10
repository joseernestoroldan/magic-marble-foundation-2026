"use client";
import NavLink from '@/components/Navbar/Menu/NavLinks/NavLink';
import { useClickOutside } from "@/hooks/useClickOutside";
import { navDropdownProps } from "@/types/types";
import { PointerEvent, useCallback, useState } from "react";
import styles from "./NavDropdown.module.css";

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
      className={styles.trigger}
      onClick={toggleOpen}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}>
      {title}
      {open && (
        <div className={styles.menu}>
          <div className={styles.menuInner}>
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
