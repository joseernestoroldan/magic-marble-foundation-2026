"use client";
import Link from "next/link";
import { useState } from "react";
import UpdateForm from "../auth/updateForm/UpdateForm";
import DangerZone from "../dangerzone/DangerZone";

type Tab = "account" | "password" | "danger";

const SettingsTabs = (data: any) => {
  const [activeTab, setActiveTab] = useState<Tab>("account");

  const tabs: { value: Tab; label: string; danger?: boolean }[] = [
    { value: "account", label: "Account" },
    { value: "password", label: "Password" },
    { value: "danger", label: "Danger Zone", danger: true },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto h-[500px]">
      <div className="sm:w-[400px] w-[300px] mx-auto">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 text-sm font-medium rounded-t-[5px] transition-colors ${
                activeTab === tab.value
                  ? tab.danger
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "account" && (
          <div className="flex flex-col space-y-8 justify-center items-center pt-8">
            <h2 className="text-xl text-gray-500 font-medium">
              Make changes to your account here.
            </h2>
            <UpdateForm data={data} />
          </div>
        )}

        {activeTab === "password" && (
          <div className="flex flex-col justify-center items-center space-y-8 pt-8">
            <h2 className="text-xl text-gray-500 font-medium">
              Change your password here.
            </h2>
            <Link
              className="border border-cyan-500 text-cyan-500 py-4 px-6 rounded-full"
              href={"/reset"}
            >
              Reset your password
            </Link>
          </div>
        )}

        {activeTab === "danger" && (
          <div className="flex flex-col justify-center items-center space-y-8 pt-8">
            <DangerZone data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsTabs;
