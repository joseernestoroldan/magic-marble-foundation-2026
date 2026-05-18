import { getAllGrantees } from "@/client";
import GranteesGrid from "@/components/Grantees/GranteesGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Grantees | Magic Marble Foundation",
  description:
    "Meet the organizations and partners supported by the Magic Marble Foundation.",
};

const GranteesPage = async () => {
  const grantees = await getAllGrantees();

  return (
    <div className="flex w-full flex-col items-center gap-12 pb-20 pt-12">
      <h2 className="text-center text-4xl font-bold text-cyan-600">Our Grantees</h2>
      {grantees && grantees.length > 0 ? (
        <GranteesGrid grantees={grantees} />
      ) : (
        <p className="px-4 py-12 text-center text-slate-400">No grantees available yet.</p>
      )}
    </div>
  );
};

export default GranteesPage;
