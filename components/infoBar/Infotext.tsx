import Link from "next/link";

type InfoTextProps = {
  href: string
  children: React.ReactNode;
};

const InfoText = ({href, children }: InfoTextProps) => {
  return (
    <div className="text-lg w-fit text-center hidden md:flex font-semibold items-center">
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </div>
  );
};

export default InfoText;
