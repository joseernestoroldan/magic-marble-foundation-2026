"use client";
import { boardType } from "@/clientTypes";
import Image from "next/image";
import { useState } from "react";

interface TabsProps {
  board: boardType[] | null;
}

const Tabs = ({ board }: TabsProps) => {
  const [numberTab, setNumberTab] = useState<number>(0);

  // Fallback to empty array if board is null
  const safeBoard = board || [];

  const boardMembers = safeBoard.filter(
    (member: boardType) => member.category === "board",
  );
  const countryCoordinators = safeBoard.filter(
    (member: boardType) => member.category === "country",
  );
  const advisoryBoard = safeBoard.filter(
    (member: boardType) => member.category === "advisory",
  );

  const renderMembers = (members: boardType[]) => {
    if (members.length === 0) {
      return <div className="py-8 text-gray-500 text-center w-full">No members found.</div>;
    }

    return (
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pt-8">
        {members.map((member) => (
          <div
            key={member._id}
            className="flex flex-col items-start gap-4 w-full bg-white/5 p-4 sm:p-6 rounded-[5px] border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full flex justify-start items-center gap-4 sm:gap-6">
              <div className="relative min-w-[70px] w-[70px] h-[70px] rounded-full overflow-hidden shrink-0 border border-gray-200">
                <Image
                  src={member.mainImage || "/placeholder.jpg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="70px"
                />
              </div>
              <div className="flex flex-col justify-center overflow-hidden">
                <h3 className="text-lg sm:text-xl font-bold truncate w-full">{member.name}</h3>
                <p className="text-gray-500 text-sm sm:text-base truncate w-full">{member.post}</p>
                {member.email && (
                  <p className="text-gray-500 text-sm sm:text-base truncate w-full">
                    <a href={`mailto:${member.email}`} className="hover:text-cyan-600 transition-colors">{member.email}</a>
                  </p>
                )}
              </div>
            </div>
            {member.body && (
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed text-left w-full">
                {member.body}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row w-full overflow-x-auto no-scrollbar border-b border-gray-200">
        <button
          className={`flex-1 min-w-max py-3 px-4 text-center text-gray-500 font-semibold transition-all duration-500 ${numberTab === 0 ? "border-b-2 border-cyan-600 text-gray-900 bg-gray-50/50" : "border-b-2 border-transparent hover:bg-gray-50 hover:text-gray-700"}`}
          onClick={() => setNumberTab(0)}>
          Board
        </button>
        <button
          className={`flex-1 min-w-max py-3 px-4 text-center text-gray-500 font-semibold transition-all duration-500 ${numberTab === 1 ? "border-b-2 border-cyan-600 text-gray-900 bg-gray-50/50" : "border-b-2 border-transparent hover:bg-gray-50 hover:text-gray-700"}`}
          onClick={() => setNumberTab(1)}>
          Country Coordinators
        </button>
        <button
          className={`flex-1 min-w-max py-3 px-4 text-center text-gray-500 font-semibold transition-all duration-500 ${numberTab === 2 ? "border-b-2 border-cyan-600 text-gray-900 bg-gray-50/50" : "border-b-2 border-transparent hover:bg-gray-50 hover:text-gray-700"}`}
          onClick={() => setNumberTab(2)}>
          Advisory Board
        </button>
      </div>
      <div className="w-full flex flex-col justify-center pb-16">
        {numberTab === 0 && renderMembers(boardMembers)}
        {numberTab === 1 && renderMembers(countryCoordinators)}
        {numberTab === 2 && renderMembers(advisoryBoard)}
      </div>
    </div>
  );
};

export default Tabs;
