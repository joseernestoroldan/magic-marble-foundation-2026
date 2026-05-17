import Charts from "@/components/Financials/Charts";
import Documents from "@/components/Financials/Documents";

const FinancialsPage = async () => {
  return (
    <div className="w-full flex flex-col items-center gap-24">
      <Charts />
      <Documents />
    </div>
  );
};
export default FinancialsPage;
