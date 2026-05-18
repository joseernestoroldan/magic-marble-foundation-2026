import { granteesType } from "@/clientTypes";
import GranteeCard from "./GranteeCard";

type GranteesGridProps = {
  grantees: granteesType[];
};

export default function GranteesGrid({ grantees }: GranteesGridProps) {
  if (!grantees.length) return null;

  return (
    <div className="grantees-grid flex w-full max-w-6xl flex-wrap justify-center gap-x-8 gap-y-10 px-4 sm:px-6">
      {grantees.map((grantee, index) => (
        <GranteeCard key={grantee._id} grantee={grantee} priority={index < 8} />
      ))}
    </div>
  );
}
