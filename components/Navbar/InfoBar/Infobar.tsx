import Chimp from "@/components/Chimp/Chimp";
import Infotext from "@/components/Navbar/InfoBar/Infotext";
import Container from "@/components/Layouts/Container/Container";
import Profile from "@/components/Profile/ProfilePopover/ProfileTrigger";
import Icons from "@/components/SocialMedia/Icons";
import styles from "./Infobar.module.css";

const Infobar = () => {
  return (
    <div className={styles.bar}>
      <Container>
        <div className={styles.inner}>
          <Infotext href="https://wa.me/13126008182">
            +1 312 - 600 - 8182
          </Infotext>
          <div className={styles.right}>
            <Infotext href="mailto:info@magicmarblefoundation.org">
              info@magicmarblefoundation.org
            </Infotext>
            <div className={styles.socialWrap}>
              <Icons />
              <Chimp />
            </div>
            <div className={styles.profileWrap}>
              <Profile />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Infobar;
