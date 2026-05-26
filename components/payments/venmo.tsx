import Image from "next/image";
import Link from "next/link";

const Venmo = () => {
  return (
    <Link
      href={
        "https://account.venmo.com/payment-link?recipients=magicmarble&txn=pay"
      
      }
      className="relative">
        {/* <span className="text-red-500 text-sm absolute text-center top-1/2 -translate-y-1/2 z-10 font-bold bg-slate-100 bg-opacity-70">Currently we are having some issues with Venmo payments. Please check out later. We appreciate your Patience.</span> */}
      <div className=" opacity-50 w-60 h-40 border border-gray-300 flex flex-col justify-center items-center rounded-[5px] space-y-4 hover:bg-gray-50">
        <button className="flex space-x-4 rounded-[5px] bg-white justify-center items-center h-12 w-52 border border-blue-400 ">
          <Image height={50} width={150} src="/venmo.webp" alt="paypal" />
        </button>
      </div>
    </Link>
  );
};

export default Venmo;
