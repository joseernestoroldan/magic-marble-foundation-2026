import DonationButton from "@/components/DonationButton/DonationButton";
import Infobar from "@/components/InfoBar/Infobar";
import Container from "@/components/Layouts/Container/Container";
import Logo from "@/components/Logo/Logo";
import MenuNavbar from "@/components/Navbar/MenuNavbar";
import ToggleSidebar from "../Sidebar/ToggleSidebar";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Infobar />
      <Container>
        <div className={styles.inner}>
          <Logo />
          <div className={styles.actions}>
            <MenuNavbar />
            <DonationButton />
            <ToggleSidebar />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
