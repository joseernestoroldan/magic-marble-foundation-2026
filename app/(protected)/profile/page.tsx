import { auth, signOut } from "@/auth";
import { getAllData } from "@/client";
import Donators from "@/components/donators/Donators";
import NotifyDiaries from "@/components/notifyDiaries/NotifyDiaries";
import ShowUsersList from "@/components/showUsersList/ShowUsersList";
import { db } from "@/db";
import Link from "next/link";
import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaGlobeAmericas } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdSettings } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

const ProfilePage = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const role = session?.user.role === "ADMIN";

  // Parallel fetch: user data and diaries at the same time
  const [data, diaries] = await Promise.all([
    db.user.findFirst({ where: { id: userId } }),
    getAllData("dairies"),
  ]);

  if (!data) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 lg:p-10 flex items-center justify-center min-h-[40vh]">
        <div className="text-center space-y-4 p-8 rounded-[5px] bg-gray-50 border border-gray-100">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
            <FaUser className="text-2xl text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-700">User profile not found</h2>
          <p className="text-sm text-gray-500">We couldn&apos;t locate your profile. Please try signing in again.</p>
          <Link
            href="/login"
            className="inline-block mt-2 px-6 py-2.5 rounded-[5px] bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const displayName = data.name
    ? data.name
    : `${data.firstName ?? ""} ${data.secondName ?? ""}`.trim();

  const initials = data.name
    ? data.name.charAt(0).toUpperCase()
    : `${(data.firstName ?? "").charAt(0)}${(data.secondName ?? "").charAt(0)}`.toUpperCase();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">Profile</h1>
        <Link
          href="/settings"
          className="flex items-center gap-2 px-8 py-2 rounded-[5px] bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium transition-colors"
        >
          <IoMdSettings className="text-base" />
          Settings
        </Link>
      </div>

      {/* User Identity Card */}
      <div className="flex items-center gap-5 p-6 rounded-[5px] bg-gray-50 border border-gray-100">
        <div className="w-16 h-16 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-white">{initials}</span>
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-cyan-600 uppercase truncate">
            {displayName}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-500 lowercase truncate">{data.email}</p>
            {data.name ? <FcGoogle className="text-base flex-shrink-0" /> : null}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      {(data.country || data.address || data.number) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.country ? (
            <div className="flex items-start gap-3 p-4 rounded-[5px] bg-gray-50 border border-gray-100">
              <div className="w-9 h-9 rounded-[5px] bg-gray-200 flex items-center justify-center flex-shrink-0">
                <FaGlobeAmericas className="text-sm text-gray-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Country</p>
                <p className="text-sm font-medium text-gray-700 capitalize mt-0.5">{data.country}</p>
              </div>
            </div>
          ) : null}

          {data.address ? (
            <div className="flex items-start gap-3 p-4 rounded-[5px] bg-gray-50 border border-gray-100">
              <div className="w-9 h-9 rounded-[5px] bg-gray-200 flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-sm text-gray-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Address</p>
                <p className="text-sm font-medium text-gray-700 capitalize mt-0.5">{data.address}</p>
              </div>
            </div>
          ) : null}

          {data.number ? (
            <div className="flex items-start gap-3 p-4 rounded-[5px] bg-gray-50 border border-gray-100">
              <div className="w-9 h-9 rounded-[5px] bg-gray-200 flex items-center justify-center flex-shrink-0">
                <FaPhoneAlt className="text-sm text-gray-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Telephone</p>
                <p className="text-sm font-medium text-gray-700 mt-0.5">
                  {data.codeNumber ? `(${data.codeNumber}) ` : ""}{data.number}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Status Badges */}
      <div className="flex flex-wrap gap-3">
        {data.emailVerified ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
            <MdVerifiedUser className="text-sm" />
            Verified
          </span>
        ) : null}

        {data.role === "ADMIN" ? (
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
      </div>

      {/* Sign Out */}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white rounded-[5px] py-2.5 px-6 text-sm font-medium transition-colors"
          type="submit"
        >
          Sign Out
        </button>
      </form>

      {/* Admin Sections */}
      {role ? (
        <section className="border-t border-gray-200 pt-8 mt-8 space-y-6">
          <ShowUsersList />
          <NotifyDiaries diaries={diaries} />
          <Donators />
        </section>
      ) : null}
    </div>
  );
};

export default ProfilePage;
