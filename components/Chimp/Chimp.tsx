import { getAllChimp } from "@/client";
import ChimpPopover from "@/components/Chimp/ChimpPopover";
import testChimpData from "@/utils/testSanityData";

const Chimp = async () => {
  const chimpData = (await getAllChimp()) ?? testChimpData;

  return <ChimpPopover chimpData={chimpData} />;
};

export default Chimp;
