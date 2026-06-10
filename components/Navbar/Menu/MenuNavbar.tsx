import NavDropdown from "@/components/Navbar/Menu/Dropdown/NavDropdown";
import NavLink from "@/components/Navbar/Menu/NavLinks/NavLink";
import { menuAbout, menuBeTheChange } from "@/utils/menuItems";
import styles from "./MenuNavbar.module.css";

const MenuNavbar = () => {
  return (
    <div className={styles.nav}>
      <NavLink title="Home" href="/" />
      <NavDropdown title={menuAbout.title} menu={menuAbout.menu} />
      <NavLink title="Gallery" href="/gallery" />
      <NavDropdown title={menuBeTheChange.title} menu={menuBeTheChange.menu} />
      <NavLink title="Our Grantees" href="/grantees" />
      <NavLink title="Paddy Field" href="/paddyfield" />
    </div>
  );
};

export default MenuNavbar;
