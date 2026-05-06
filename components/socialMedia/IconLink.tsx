import Link from "next/link";
import { IconType } from "react-icons/lib";

interface IconLinkProps {
  href: string;
  Icon: IconType;
}

const IconLink = ({ href, Icon }: IconLinkProps) => {
  return (
    <Link href={href} passHref target="_blank">
      <Icon className="text-3xl text-inherit hover:opacity-80 hover:scale-105 transition-all duration-300" />
    </Link>
  );
};

export default IconLink