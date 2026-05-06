import { LiaFacebook as FbIcon } from "react-icons/lia";
import { LiaInstagram as IgIcon } from "react-icons/lia";
import { TiSocialYoutubeCircular as YouTubeIcon } from "react-icons/ti";
import { AiFillTikTok as TikTokIcon } from "react-icons/ai";
import IconLink from "./IconLink";

const links = [
  {
    href: "https://www.facebook.com/magicmarblefoundation",
    Icon: FbIcon,
  },
  {
    href: "https://www.instagram.com/magicmarblefoundation",
    Icon: IgIcon,
  },
  {
    href: "https://www.youtube.com/@magicmarble2478",
    Icon: YouTubeIcon,
  },
  {
    href: "https://www.tiktok.com/@themagicmarble",
    Icon: TikTokIcon,
  },
];

const Icons = () => {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      {links.map((link) => (
        <IconLink key={link.href} href={link.href} Icon={link.Icon} />
      ))}
    </div>
  );
};

export default Icons;
