import { LiaFacebook as FbIcon } from "react-icons/lia";
import { LiaInstagram as IgIcon } from "react-icons/lia";
import { TiSocialYoutubeCircular as YouTubeIcon } from "react-icons/ti";
import { AiFillTikTok as TikTokIcon } from "react-icons/ai";
import IconLink from "./IconLink";

const links = [
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

const Icons = () => {
  return (
    <div className="flex flex-row items-center gap-1">
      {links.map((link) => (
        <IconLink key={link.href} href={link.href} Icon={link.Icon} name={link.name} />
      ))}
    </div>
  );
};

export default Icons;
