"use client";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  MdOutlineUnsubscribe,
  MdUnsubscribe,
  MdVerifiedUser,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { useState } from "react";

type UserDetailsProps = {
  name?: string | null;
  firstName?: string | null;
  secondName?: string | null;
  email?: string | null;
  country?: string | null;
  address?: string | null;
  codeNumber?: string | null;
  number?: string | null;
  subscribed?: boolean;
  emailVerified?: Date | null;
  role: "ADMIN" | "USER";
};

const UserDetails = ({
  name,
  firstName,
  secondName,
  email,
  country,
  address,
  codeNumber,
  number,
  subscribed,
  emailVerified,
  role,
}: UserDetailsProps) => {
  const [open, setOpen] = useState(false);

  const displayName = name
    ? name
    : `${firstName ?? ""} ${secondName ?? ""}`.trim();

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-overlay {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .modal-card {
          animation: slideUp 0.25s ease-out forwards;
        }
      `}</style>

      <button
        onClick={() => setOpen(true)}
        className="bg-cyan-600 text-white py-1.5 px-4 rounded-[5px] text-sm font-medium hover:bg-cyan-600 transition-colors"
      >
        Details
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm modal-overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-[5px] p-6 mx-4 shadow-xl max-h-[85vh] overflow-y-auto modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
              <h2 className="text-lg font-bold text-gray-800">User Details</h2>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-[5px] hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors text-xl"
              >
                &times;
              </button>
            </div>

            {/* Name Section */}
            <div className="mb-5">
              <h3 className="text-2xl font-bold text-gray-800 uppercase">
                {displayName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-500 lowercase">{email}</p>
                {name ? <FcGoogle className="text-base flex-shrink-0" /> : null}
              </div>
            </div>

            {/* Info Rows */}
            <div className="space-y-3">
              {country ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-sm">
                  <span className="font-semibold text-gray-500 sm:w-28 flex-shrink-0">Country</span>
                  <span className="text-gray-700 capitalize">{country}</span>
                </div>
              ) : null}

              {address ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-sm">
                  <span className="font-semibold text-gray-500 sm:w-28 flex-shrink-0">Address</span>
                  <span className="text-gray-700 capitalize">{address}</span>
                </div>
              ) : null}

              {number ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-sm">
                  <span className="font-semibold text-gray-500 sm:w-28 flex-shrink-0">Telephone</span>
                  <span className="text-gray-700">
                    {codeNumber ? `(${codeNumber}) ` : ""}{number}
                  </span>
                </div>
              ) : null}
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 mt-4">
              {emailVerified ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <MdVerifiedUser className="text-sm" />
                  Verified
                </span>
              ) : null}

              {role === "ADMIN" ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  <RiAdminFill className="text-sm" />
                  Admin
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
                  <FaUser className="text-xs" />
                  User
                </span>
              )}

              {subscribed ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-medium bg-cyan-50 text-cyan-600 border border-cyan-200">
                  <MdUnsubscribe className="text-sm" />
                  Subscribed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200">
                  <MdOutlineUnsubscribe className="text-sm" />
                  Not Subscribed
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserDetails;
