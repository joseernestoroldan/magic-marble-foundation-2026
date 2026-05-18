import Chimp from "@/components/Chimp/Chimp";
import Infotext from "@/components/InfoBar/Infotext";
import Container from "@/components/Layouts/Container/Container";
import Profile from "@/components/Profile/Profile";
import Icons from "@/components/socialMedia/Icons";

const Infobar = () => {
  return (
    <div className="w-full bg-gray-800 text-gray-200 py-2 flex items-center relative md:static">
      <Container>
        <div className="w-full flex justify-center items-center md:justify-between">
          <Infotext href="https://wa.me/13126008182">
            +1 312 - 600 - 8182
          </Infotext>
          <div className="flex gap-2 justify-end">
            <Infotext href="mailto:info@magicmarblefoundation.org">
              info@magicmarblefoundation.org
            </Infotext>
            <div className="flex justify-center items-center gap-1">
              <Icons />
              <Chimp />
            </div>
            <div className="flex justify-center min-w-[50px] lg:min-w-[140px] items-center overflow-visible">
              <Profile />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Infobar;
