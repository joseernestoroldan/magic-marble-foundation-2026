import Image from "next/image";

const OurPartners = () => {
  return (
    <section className="flex flex-col items-center gap-24">
      <h2 className="text-cyan-600 font-bold text-4xl text-center">
        Our Partners
      </h2>
      <div className="flex flex-col justify-around items-center md:flex-row w-full">
        <div className="relative w-[200px] h-[200px]">
          <Image
            className="object-contain"
            src={"/helpAnimalsIndia.webp"}
            alt="help animals india"
            fill
          />
        </div>
        <div className="relative w-[200px] h-[200px]">
          <Image
            className="object-contain"
            src={"veganGroup.webp"}
            alt="help animals india"
            fill
          />
        </div>
        <div className="relative w-[200px] h-[200px]">
          <Image
            className="object-contain"
            src={"wellFed.webp"}
            alt="help animals india"
            fill
          />
        </div>
        <div className="relative w-[200px] h-[200px]">
          <Image
            className="object-contain"
            src={"thrive.webp"}
            alt="thrive"
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
