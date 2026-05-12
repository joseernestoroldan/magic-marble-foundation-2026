import Link from "next/link";

const DonationButton = () => {
  return (
    <Link href={"/donations"}  className="rounded-[5px] text-sm sm:text-base bg-cyan-600 hover:bg-cyan-400 text-white h-[40px] w-[80px] sm:w-[140px] flex justify-center items-center font-bold transition-all duration-500 ease-in-out">
      Donate
    </Link>
  )
}

export default DonationButton 