import { TabsTeam } from "./Tabs";
import SubHeading from "../Heading/subheading";
import EnterSection from "../animations/enterSection/EnterSection";
import LayoutY from "../Layouts/layoutY/LayoutY";

const OurTeam = () => {
  return (
    <EnterSection>
      <LayoutY>
        <SubHeading title="Our Team" />
        <TabsTeam />
      </LayoutY>
    </EnterSection>
  );
};

export default OurTeam;
