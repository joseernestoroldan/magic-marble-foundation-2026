import { auth } from "@/auth";
import SettingsTabs from "@/components/settingsTabs/SettingsTabs";
import { db } from "@/db";
import Link from "next/link";

const SettingsPage = async () => {
  const session = await auth();
  const userId = session?.user.id;

  const data = await db.user.findFirst({ where: { id: userId } });

  return (
    <div className="w-full max-w-5xl mx-auto min-h-[calc(100vh-200px)] flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link
            href="/profile"
            className="hover:text-cyan-600 transition-colors duration-200"
          >
            Profile
          </Link>
          <span className="select-none">/</span>
          <span className="text-gray-700 font-medium">Settings</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-800 mt-3 tracking-tight">
          Settings
        </h1>
      </div>

      {data ? (
        <SettingsTabs data={data} />
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 text-gray-400 space-y-2">
          <p className="text-lg font-medium">Unable to load your data</p>
          <p className="text-sm">
            Please try again later or{" "}
            <Link href="/profile" className="text-cyan-600 hover:underline">
              return to your profile
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
