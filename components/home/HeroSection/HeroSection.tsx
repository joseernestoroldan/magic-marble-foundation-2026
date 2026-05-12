import HeroCarousel from "@/components/Carousels/HeroCarousel/HeroCarousel";
import Heading from "@/components/Heading/Heading";

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-142px)] overflow-hidden">
      <div className="absolute z-10 top-6 left-4 right-4 md:top-10 md:left-10 md:right-auto lg:top-20 lg:left-20">
        <Heading
          text="Magic Marble Foundation"
          size="text-xl md:text-4xl lg:text-5xl"
        />
      </div>
      <HeroCarousel />
    </div>
  );
};

export default HeroSection;
