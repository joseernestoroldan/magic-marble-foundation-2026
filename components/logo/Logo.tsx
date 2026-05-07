import Image from "next/image";
import Link from "next/link";


const Logo = () => {
  return (
    <div className="flex justify-start gap-2 items-center py-2">
      <Link href={"/"}>
        <div className="w-[70px] h-[70px] relative">
          <Image
            fill
            src="/navlogo.png"
            alt="magic marble foundation"
            priority
          />
        </div>
      </Link>
      <div className="flex flex-col">
        <span className="text-black uppercase min-[426px]:text-sm text-xs font-medium leading-none">
          Magic
        </span>
        <span className="text-cyan-500 uppercase min-[426px]:text-sm text-xs font-medium leading-none">
          Marble
        </span>
        <span className="text-black uppercase min-[426px]:text-sm text-xs font-medium leading-none">
          Foundation
        </span>
      </div>
    </div>
  );
};

export default Logo;
