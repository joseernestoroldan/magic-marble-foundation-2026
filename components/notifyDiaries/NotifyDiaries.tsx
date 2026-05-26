"use client";
import { notifyDiary } from "@/actions/sentDiaries";
import Image from "next/image";
import { useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";

const NotifyDiaries = ({ diaries }: any) => {
  const [notifyingId, setNotifyingId] = useState<string | null>(null);

  const handleNotify = async (
    id: string,
    image: string,
    title: string,
    description: string,
    numberNotifications: number
  ) => {
    try {
      setNotifyingId(id);
      await notifyDiary(id, image, title, description, numberNotifications);
    } finally {
      setNotifyingId(null);
    }
  };

  return (
    <div className="w-full border border-gray-200 rounded-[5px] p-5 space-y-4">
      <h3 className="text-lg font-semibold text-gray-600 mb-4">
        Diary Notifications
      </h3>
      <div className="flex flex-col gap-3">
        {diaries.map((item: any) => {
          const numberNotifications = item.notificationsSent || 0;

          return (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-[5px] bg-gray-50 border border-gray-100"
            >
              {/* Image */}
              <div className="w-16 h-14 min-w-[4rem] relative rounded-[5px] overflow-hidden flex-shrink-0">
                <Image
                  src={item.mainImage}
                  alt={item.title || "diary image"}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Title */}
              <p className="text-sm font-medium text-gray-700 flex-1 min-w-0 truncate">
                {item.title}
              </p>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] text-xs font-medium ${
                  item.notificationSent
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <MdMarkEmailRead className="text-sm" />
                {item.notificationSent ? "Notified" : "Not Notified"}
              </span>

              {/* Notification Count Badge */}
              {numberNotifications > 0 ? (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-[5px]">
                  {numberNotifications} sent
                </span>
              ) : (
                <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-[5px]">
                  0 sent
                </span>
              )}

              {/* Notify Button */}
              <button
                onClick={() =>
                  handleNotify(
                    item._id,
                    item.title,
                    item.mainImage,
                    item.description,
                    numberNotifications
                  )
                }
                disabled={notifyingId === item._id}
                className="py-1.5 px-4 rounded-[5px] bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                {notifyingId === item._id
                  ? "Sending..."
                  : item.notificationSent
                    ? "Notify Again"
                    : "Notify"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotifyDiaries;
