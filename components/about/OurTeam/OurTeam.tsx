import Container from "@/components/Layouts/Container/Container";
import Tabs from "./Tabs";
import { getBoard } from "@/client";

const OurTeam = async () => {
  const board = await getBoard();
  return (
    <div className="w-full flex flex-col items-center gap-24 min-h-[calc(100vh-142px)]">
      <h2 className="text-cyan-600 font-bold text-3xl">Our Team</h2>
      <Container>
        <Tabs board={board} />
      </Container>
    </div>
  );
};

export default OurTeam;
