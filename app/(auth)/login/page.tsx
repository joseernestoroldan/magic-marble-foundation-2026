import LoginCard from "@/components/auth/loginForm/LoginCard";
import DonationButton from "@/components/DonationButton/DonationButton";
import Image from "next/image";

const imageOverlay = (
  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/70 via-black/30 to-transparent" />
);

const heroContent = (
  <div className="absolute inset-0 flex flex-col justify-end items-center gap-10 pb-16">
    <h2 className="text-white text-3xl font-bold text-center px-4">
      Your Choices Can Change The World
    </h2>
    <DonationButton />
  </div>
);

const LoginPage = () => {
  return (
    <div className="w-full min-h-[calc(100vh-142px)] flex flex-col justify-center items-center max-w-5xl mx-auto">
      <div className="w-full flex justify-center lg:justify-start min-h-[calc(100vh-200px)]">
        <div className="hidden lg:block lg:w-1/2 relative rounded-[5px] overflow-hidden shadow-xl shadow-cyan-900/20">
          <Image
            className="object-cover object-center"
            src={"/sterilization.webp"}
            alt="Magic Marble Foundation"
            fill
            priority
          />
          {imageOverlay}
          {heroContent}
        </div>
        <div className="w-[90%] sm:w-[70%] lg:w-1/2 animate-fade-in-pro">
          <LoginCard />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
