"use client";
import { DeleteAccount } from "@/actions/delete";
import { logout } from "@/actions/logout";
import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";

const DangerZone = ({ data }: any) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      const result = await DeleteAccount(data.data.id);
      if (result.success) {
        await logout();
      } else {
        setError("Failed to delete account. Please try again.");
        setIsDeleting(false);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="border border-red-200 bg-red-50 w-full rounded-[5px] p-8 space-y-4">
      <div className="flex items-center gap-3">
        <IoWarningOutline className="text-red-500 text-2xl flex-shrink-0" />
        <h3 className="text-lg font-semibold text-red-700">Danger Zone</h3>
      </div>

      <p className="text-sm text-red-600/80 leading-relaxed">
        Deleting your account is permanent and cannot be undone. All your data,
        including your profile, orders, and preferences, will be permanently
        removed from our servers.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 text-sm rounded-[5px] px-4 py-2">
          {error}
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        className="bg-red-100 text-red-600 text-sm font-medium py-2.5 px-5 border border-red-300 rounded-[5px] hover:bg-red-200 transition-all duration-200"
      >
        Delete Account
      </button>

      {open && (
        <>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(16px) scale(0.98); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            style={{ animation: "fadeIn 0.2s ease-out" }}
            onClick={() => {
              if (!isDeleting) setOpen(false);
            }}
          >
            <div
              className="bg-white rounded-[5px] p-8 max-w-md w-full mx-4 shadow-xl"
              style={{ animation: "slideUp 0.2s ease-out" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-[5px] bg-red-100 flex items-center justify-center">
                  <IoWarningOutline className="text-red-500 text-2xl" />
                </div>
                <h2 className="text-xl font-semibold text-red-600">
                  Are you absolutely sure?
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </p>
              </div>

              <div className="w-full flex justify-end gap-3 pt-8">
                <button
                  onClick={() => setOpen(false)}
                  disabled={isDeleting}
                  className="text-gray-600 text-sm font-medium py-2.5 px-6 border border-gray-300 rounded-[5px] hover:bg-gray-50 transition-all duration-200 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-500 text-white text-sm font-medium py-2.5 px-6 rounded-[5px] hover:bg-red-600 transition-all duration-200 disabled:opacity-60 flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <ImSpinner9 className="animate-spin text-sm" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Account"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DangerZone;
