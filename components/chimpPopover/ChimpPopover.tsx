"use client";
import { FaMailchimp as ChimpIcon } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { QueryType } from "@/types/types";

const ChimpPopover = ({ chimpData }: { chimpData: QueryType[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const monthNumberToString = (monthNumber: string) => {
    switch (monthNumber) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "Agost";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
    }
  };

  const stringToDate = (stringDate: string) => {
    const str = stringDate;
    const year = str.substring(0, 4);
    const mounthNumber = str.substring(5, 7);
    const month = monthNumberToString(mounthNumber);
    const day = str.substring(8, 10);
    return { day: day, month: month, year: year };
  };

  return (
    <button
      className="flex flex-col justify-center items-center relative"
      ref={containerRef}
      onClick={() => {
        setIsOpen(!isOpen);
      }}>
      <ChimpIcon className="text-3xl" />
      <div
        className={`absolute z-50 top-0 left-0 -translate-x-1/2 lg:translate-x-0 lg:right-0 w-[300] lg:w-[400px] bg-gray-700 rounded-[5px] transition-all duration-500 ${isOpen ? "opacity-100 translate-y-[50px] pointer-events-auto" : "opacity-0 translate-y-[20px] pointer-events-none"}`}>
        <div className="text-white text-sm lg:text-base underline font-semibold text-center pt-4">
          This Are The Newest Chimps
        </div>
        <div className="text-white text-sm lg:text-base px-4 py-4">
          {chimpData.map((item: QueryType, index: number) => {
            const date = stringToDate(item._createdAt);
            return (
              <div className="py-1" key={index}>
                {item.chimpLink && (
                  <p className="font-medium text-sm lg:text-base italic">
                    {date.month} | {date.year}:
                  </p>
                )}

                {item.chimpLink && (
                  <Link href={item.chimpLink}>
                    <p className="font-semibold text-sm lg:text-base">{item.title}</p>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </button>
  );
};

export default ChimpPopover;
