import NavDropdown from "@/components/Navbar/NavDropdown";
import NavLink from "@/components/Navbar/NavLink";
import { menuAbout, menuBeTheChange } from "@/utils/menuItems";

const MenuNavbar = () => {
  return (
    <div className="hidden lg:flex gap-3 font-medium items-center">
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
