import RegisterCard from "@/components/auth/registerForm/RegisterCard";
import DonationButton from "@/components/DonationButton/DonationButton";
import Image from "next/image";

const imageOverlay = (
  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/70 via-black/30 to-transparent" />
);

const heroContent = (
  <div className="absolute inset-0 flex flex-col justify-center items-center gap-10">
    <DonationButton />
    <h2 className="text-white text-4xl font-bold text-center px-4">
      Your Choices Can Change The World
    </h2>
  </div>
);

const RegisterPage = async () => {
  return (
    <div className="w-full h-auto sm:h-[calc(100vh-148px)] flex flex-col justify-center items-center max-w-5xl mx-auto">
      <div className="w-full h-auto sm:h-[calc(100vh-200px)] flex justify-center ">
        <div className="hidden lg:w-1/2 relative rounded-[5px] overflow-hidden lg:block shadow-xl shadow-cyan-900/20">
          <Image
            className="object-cover object-center"
            src={"/sanctuary.webp"}
            alt="Magic Marble Foundation"
            fill
            priority
          />
          {imageOverlay}
          {heroContent}
        </div>
        <div className="w-[90%] sm:w-[70%] lg:w-1/2 animate-fade-in-pro sm:h-[calc(100vh-200px)] bg-blue-400">
          <RegisterCard />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
