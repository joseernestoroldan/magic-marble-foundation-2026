import Container from "../layouts/container/Container";
import SmokeText from "../SmokeText/SmokeText";
import Image from "next/image";

const AboutUs = () => {
  return (
    <Container>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full min-h-[calc(100vh-140px)] gap-12 py-16">
        
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-10">
          <div className="w-full relative text-wrap">
            <SmokeText
              text="About Magic Marble Foundation"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-600 drop-shadow-sm md:justify-start"
              staggerMs={40}
            />
          </div>
          <div className="w-full">
            <p className="w-full indent-6 text-base md:text-lg lg:text-xl text-gray-500 font-medium text-justify ">
              Magic Marble Foundation works to alleviate the suffering of
              underprivileged human and non-human animal populations by
              providing planet-friendly support including food, housing, medical
              treatment, education, and the financial assistance required to
              procure these basic needs.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] relative rounded-full overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] ring-4 ring-cyan-500/20">
            <Image
              className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-in-out"
              src="/logo.jpg"
              fill
              alt="Magic Marble Foundation"
              priority={true}
            />
          </div>
        </div>

      </div>
    </Container>
  );
};

export default AboutUs;
