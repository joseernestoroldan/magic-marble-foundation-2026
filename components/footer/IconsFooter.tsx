import { LiaFacebook as FbIcon } from "react-icons/lia";
import { LiaInstagram as IgIcon } from "react-icons/lia";
import { TiSocialYoutubeCircular as YouTubeIcon } from "react-icons/ti";
import { AiFillTikTok as TikTokIcon } from "react-icons/ai";
import Link from "next/link";
import { IconType } from "react-icons/lib";

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
    className="
      flex items-center justify-center
      w-10 h-10 rounded-full
      bg-slate-700 hover:bg-cyan-600
      text-slate-300 hover:text-white
      transition-all duration-300 ease-in-out
      hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30
    "
  >
    <Icon className="text-xl" />
  </Link>
);

const IconsFooter = () => {
  return (
    <div className="flex flex-row items-center gap-3">
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
