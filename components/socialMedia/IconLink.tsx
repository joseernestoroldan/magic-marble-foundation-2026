import Link from "next/link";
import { IconType } from "react-icons/lib";
import styles from "./IconLink.module.css";

interface IconLinkProps {
  href: string;
  Icon: IconType;
  name: string;
}

const IconLink = ({ href, Icon, name }: IconLinkProps) => {
  return (
    <Link className={styles.link} href={href} target="_blank" aria-label={`Visit our ${name}`}>
      <Icon className={styles.icon} />
    </Link>
  );
};

export default IconLink