import { menuItems } from "@/utils/menuItems";
import Link from "next/link";

const MenuFooter = () => {
  return (
    <ul className="flex flex-col items-center gap-2">
      {menuItems.map((item) => (
        <li key={item.title}>
          <Link
            href={item.link}
            className="
              text-slate-400 text-sm
              hover:text-cyan-400
              hover:translate-x-1
              transition-all duration-200
              inline-block
            "
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuFooter;
