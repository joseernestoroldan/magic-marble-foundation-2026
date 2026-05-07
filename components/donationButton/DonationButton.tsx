import Link from "next/link";

const DonationButton = () => {
  return (
    <Link href={"/donations"}  className="rounded-[5px] bg-cyan-500 hover:bg-cyan-400 text-white h-[40px] w-[140px] flex justify-center items-center font-bold">
      Donate
    </Link>
  )
}

export default DonationButton