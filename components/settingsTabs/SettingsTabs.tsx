"use client";
import Link from "next/link";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoWarning } from "react-icons/io5";
import UpdateForm from "../auth/updateForm/UpdateForm";
import DangerZone from "../dangerzone/DangerZone";

type Tab = "account" | "password" | "danger";

const SettingsTabs = ({ data }: { data: any }) => {
  const [activeTab, setActiveTab] = useState<Tab>("account");

  const tabs: { value: Tab; label: string; icon: React.ReactNode; danger?: boolean }[] = [
    { value: "account", label: "Account", icon: <FaUser className="text-sm" /> },
    { value: "password", label: "Password", icon: <RiLockPasswordLine className="text-base" /> },
    { value: "danger", label: "Danger Zone", icon: <IoWarning className="text-base" />, danger: true },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${
              activeTab === tab.value
                ? tab.danger
                  ? "border-red-500 text-red-600"
                  : "border-cyan-600 text-gray-800"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "account" ? (
        <div className="flex flex-col space-y-8 justify-center items-center pt-8">
          <h2 className="text-xl text-gray-500 font-medium">
            Make changes to your account here.
          </h2>
          <UpdateForm data={{ data }} />
        </div>
      ) : activeTab === "password" ? (
        <div className="flex flex-col justify-center items-center space-y-8 pt-8">
          <h2 className="text-xl text-gray-500 font-medium">
            Change your password here.
          </h2>
          <Link
            className="border border-cyan-600 text-cyan-600 py-4 px-6 rounded-[5px] hover:bg-cyan-50 transition-colors duration-200"
            href="/reset"
          >
            Reset your password
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-8 pt-8">
          <DangerZone data={{ data }} />
        </div>
      )}
    </div>
  );
};

export default SettingsTabs;
