import Container from "@/components/Layouts/Container/Container";
import SmokeText from "@/components/SmokeText/SmokeText";

const OurMIssion = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-36 pb-12">
        <h2 className="text-cyan-600 font-bold text-4xl text-center">
          Our Mission
        </h2>

        {/* Smoke letter animation */}
        <SmokeText
          text="To Mobilize Empathy For All Species And The World We Share"
          staggerMs={55}
          initialDelayMs={100}
          className="
            text-xl sm:text-2xl md:text-3xl lg:text-4xl italic
            font-semibold text-gray-500 text-center
            max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl
            leading-relaxed
          "
        />
      </div>
    </Container>
  );
};

export default OurMIssion;
