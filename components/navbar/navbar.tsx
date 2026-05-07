import Infobar from "@/components/infoBar/Infobar";
import Container from "@/components/layouts/container/Container";
import Logo from "@/components/logo/Logo";
import MenuNavbar from "@/components/navbar/MenuNavbar";
import DonationButton from "@/components/donationButton/DonationButton";


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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
