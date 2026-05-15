import Container from "@/components/Layouts/Container/Container";
import SmokeText from "@/components/SmokeText/SmokeText";

const OurValues = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-36 pb-12">
        <h2 className="text-cyan-600 font-bold text-4xl text-center">
          Our Values
        </h2>

        {/* Smoke letter animation */}
        <SmokeText
          text="At Magic Marble Foundation, our values are anchored in equality, holistic care, and a commitment to providing help without causing harm. Rooted in the belief that every action has a profound impact, we embrace veganism as a cornerstone of our dedication to compassionate practices and environmental stewardship. We envision a world where all sentient beings, both humans and non-humans, can thrive without experiencing harm. Join us in shaping a future where support is synonymous with sustainability, empathy, and the well-being of all."
          staggerMs={55}
          initialDelayMs={100}
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

export default OurValues;
