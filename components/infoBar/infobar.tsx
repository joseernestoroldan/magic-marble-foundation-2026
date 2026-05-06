import Link from "next/link";
import Chimp from "../chimpPopover/Chimp";
import Container from "../layouts/container/Container";
import Profile from "../profile/Profile";
import Icons from "../socialMedia/Icons";
import Infotext from "./Infotext";

const Infobar = () => {
  return (
    <div className="w-full bg-gray-800 text-gray-200 py-2 flex items-center">
      <Container>
        <div className="w-full flex justify-center md:justify-between items-center">
          <Infotext>
            <Link
              href="https://wa.me/13126008182"
              target="_blank"
              rel="noopener noreferrer">
              +1 312 - 600 - 8182
            </Link>
          </Infotext>
          <div className="flex gap-2">
            <Infotext>
              <Link href="mailto:info@magicmarblefoundation.org">
                info@magicmarblefoundation.org
              </Link>
            </Infotext>
            <div className="flex justify-center items-center ">
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
