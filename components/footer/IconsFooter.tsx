import Link from "next/link";
import { AiFillTikTok as TikTokIcon } from "react-icons/ai";
import { LiaFacebook as FbIcon, LiaInstagram as IgIcon } from "react-icons/lia";
import { IconType } from "react-icons/lib";
import { TiSocialYoutubeCircular as YouTubeIcon } from "react-icons/ti";
import styles from "./IconsFooter.module.css";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/magicmarblefoundation",
    Icon: FbIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/magicmarblefoundation",
    Icon: IgIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@magicmarble2478",
    Icon: YouTubeIcon,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@themagicmarble",
    Icon: TikTokIcon,
  },
];

interface FooterIconLinkProps {
  href: string;
  Icon: IconType;
  name: string;
}

const FooterIconLink = ({ href, Icon, name }: FooterIconLinkProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit our ${name}`}
    className={styles.iconLink}
  >
    <Icon className={styles.icon} />
  </Link>
);

const IconsFooter = () => {
  return (
    <div className={styles.wrapper}>
      {socialLinks.map((link) => (
        <FooterIconLink
          key={link.href}
          href={link.href}
          Icon={link.Icon}
          name={link.name}
        />
      ))}
    </div>
  );
};

export default IconsFooter;
