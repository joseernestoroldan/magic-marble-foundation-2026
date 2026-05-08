"use client";
import { FaMailchimp as ChimpIcon } from "react-icons/fa";
import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useClickOutside } from "@/hooks/useClickOutside";
import { formatDate } from "@/utils/formatDate";
import { chimpType } from "@/clientTypes";

const ChimpPopover = ({ chimpData }: { chimpData: chimpType[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const containerRef = useClickOutside<HTMLButtonElement>(
    useCallback(() => setIsOpen(false), []),
  );

  const formattedData = useMemo(() => {
    return chimpData.map((item) => ({
      ...item,
      date: formatDate(item._createdAt),
    }));
  }, [chimpData]);

  return (
    <button
      className="flex flex-col justify-center items-center static md:relative"
      ref={containerRef}
      onClick={() => {
        setIsOpen(!isOpen);
      }}>
      <ChimpIcon className="text-3xl" />
      <div
        className={`absolute z-50 top-[20px] md:top-0  right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 w-[300px] md:w-[400px] bg-gray-700 rounded-[5px] transition-all duration-500 ${isOpen ? "opacity-100 translate-y-[50px] pointer-events-auto" : "opacity-0 translate-y-[20px] pointer-events-none"}`}>
        <div className="text-white text-sm lg:text-base underline font-semibold text-center pt-4">
          This Are The Newest Chimps
        </div>
        <div className="text-white text-sm lg:text-base px-4 py-4">
          {formattedData.map((item) => {
            if (!item.chimpLink) return null;

            return (
              <div className="py-1" key={item._id}>
                <p className="font-medium text-sm lg:text-base italic">
                  {item.date.month} | {item.date.year}:
                </p>
                <Link href={item.chimpLink}>
                  <p className="font-semibold text-sm lg:text-base">
                    {item.title}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </button>
  );
};

export default ChimpPopover;
