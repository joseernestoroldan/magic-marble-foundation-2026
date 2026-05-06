import Chimp from "../chimpPopover/Chimp";
import Container from "../layouts/container/Container";
import Profile from "../profile/Profile";
import Icons from "../socialMedia/Icons";
import Infotext from "./Infotext";

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
            <div className="flex justify-center min-w-[50px] lg:min-w-[120px] items-center overflow-visible">
              <Profile />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Infobar;
