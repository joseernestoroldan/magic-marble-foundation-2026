import { menuItems } from "@/utils/menuItems";
import Link from "next/link";
import styles from "./MenuFooter.module.css";

const MenuFooter = () => {
  return (
    <ul className={styles.list}>
      {menuItems.map((item) => (
        <li key={item.title}>
          <Link
            href={item.link}
            className={styles.link}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuFooter;
