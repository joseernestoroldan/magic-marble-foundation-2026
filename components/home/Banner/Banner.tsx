import Container from "@/components/Layouts/Container/Container";
import SmokeText from "../../SmokeText/SmokeText";

const Banner = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        <SmokeText
          text="At the Magic Marble Foundation, we are a dedicated team of individuals striving to create a better world through empathy and action. Our organization is committed to empowering underserved communities, promoting animal welfare, and championing environmental activism. Together, we work diligently to cultivate a compassionate global community that respects and values all living beings and the environment we share."
          staggerMs={20}
          initialDelayMs={20}
          className="
            text-xl sm:text-2xl italic
            font-semibold text-gray-500 text-center
            max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl
            leading-relaxed
          "
        />
      </div>
    </Container>
  );
};

export default Banner;
