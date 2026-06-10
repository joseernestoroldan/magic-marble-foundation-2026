import Container from "../Layouts/Container/Container";
import Logo from "../Logo/Logo";
import IconsFooter from "./IconsFooter";
import MenuFooter from "./MenuFooter";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topLine} />

      <Container>
        <div className={styles.grid}>
          <div className={styles.colGap5}>
            <div className={styles.logoWrapper}>
              <Logo />
            </div>
            <p className={styles.description}>
              USA based tax-exempt charitable organization (tax-id number
              86-1626792) under Section 501(c)(3) of the Internal Revenue Code.
              Donations are tax-deductible as allowed by law.
            </p>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>
              Register Address
            </h3>
            <p className={styles.address}>
              455 E. Eisenhower Parkway #355
              <br />
              Ann Arbor, Michigan, 48108
              <br />
              USA
            </p>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>
              Navigation
            </h3>
            <MenuFooter />
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>
              Follow Us
            </h3>
            <p className={styles.socialSubtext}>
              Stay connected with our community
            </p>
            <IconsFooter />
          </div>
        </div>
      </Container>

      <div className={styles.divider} />

      <Container>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            Created by{" "}
            <span className={styles.copyrightBrand}>Code2Steps</span>
          </p>
          <p className={styles.copyright}>
            © 2024 Magic Marble Foundation. All rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
