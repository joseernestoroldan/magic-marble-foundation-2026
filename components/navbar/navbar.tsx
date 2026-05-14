import Infobar from "@/components/InfoBar/Infobar";
import Container from "@/components/Layouts/Container/Container";
import Logo from "@/components/Logo/Logo";
import MenuNavbar from "@/components/Navbar/MenuNavbar";
import DonationButton from "@/components/DonationButton/DonationButton";
import ToggleSidebar from "../Sidebar/ToggleSidebar";

const Navbar = () => {
  return (
    <div className="w-full sticky top-0 left-0 right-0 z-20 bg-white">
      <Infobar />
      <Container>
        <div className="w-full flex justify-between items-center">
          <Logo />
          <div className="flex items-center justify-center gap-2">
            <MenuNavbar />
            <DonationButton />
            <ToggleSidebar />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
