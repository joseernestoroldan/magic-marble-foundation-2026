"use client";
import { DeleteAccount } from "@/actions/delete";
import { logout } from "@/actions/logout";
import { useState } from "react";

import { useRouter } from "next/navigation";

const DangerZone = ({ data }: any) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    console.log("client id:", data.data.id);
    DeleteAccount(data.data.id).then((data) => {
        if(data.success){
            logout()
        }
    })
  };

  return (
    <div className="border border-red-500 bg-red-100 w-full h-[300px] flex flex-col justify-center items-center rounded-[5px]">
      <button
        onClick={() => setOpen(true)}
        className="bg-red-200 text-red-600 text-lg py-2 px-4 border-red-600 rounded-full border"
      >
        Delete Account
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-red-100 text-red-600 rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl text-center font-semibold">
              Are you absolutely sure?
            </h2>

            <div className="w-full flex justify-center gap-x-10 py-8">
              <button
                onClick={handleDelete}
                className="bg-red-200 text-red-600 text-lg py-2 px-6 border-red-600 rounded-full border hover:bg-opacity-70"
              >
                Delete
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-200 text-gray-600 text-lg py-2 px-6 border-gray-600 rounded-full border hover:bg-opacity-70"
              >
                Cancel
              </button>
            </div>
            <p className="text-base text-center">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DangerZone;
