import { getAllData } from "@/client";
import ChimpPopover from "./ChimpPopover";

const Chimp = async () => {
  const chimpData = await getAllData("chimp");

  return <ChimpPopover chimpData={chimpData} />
};

export default Chimp;
