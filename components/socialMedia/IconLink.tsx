import Link from "next/link";
import { IconType } from "react-icons/lib";

interface IconLinkProps {
  href: string;
  Icon: IconType;
  name: string;
}

const IconLink = ({ href, Icon, name }: IconLinkProps) => {
  return (
    <Link href={href} target="_blank" aria-label={`Visit our ${name}`}>
      <Icon className="text-3xl text-inherit hover:opacity-80 hover:scale-105 transition-all duration-500" />
    </Link>
  );
};

export default IconLink