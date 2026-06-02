import { auth } from "@/auth";
import { db } from "@/db";
import { Suspense } from "react";
import styles from "./page.module.css";
import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";
import UserIdentityCard from "@/components/Profile/UserIdentityCard/UserIdentityCard";
import InfoGrid from "@/components/Profile/InfoGrid/InfoGrid";
import StatusBadges from "@/components/Profile/StatusBadges/StatusBadges";
import SignOutForm from "@/components/Profile/SignOutForm/SignOutForm";
import UserNotFound from "@/components/Profile/UserNotFound/UserNotFound";
import AdminSection from "@/components/Profile/AdminSection/AdminSection";

const ProfilePage = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const role = session?.user.role === "ADMIN";
  const data = await db.user.findFirst({ where: { id: userId } });

  if (!data) return <UserNotFound />;

  return (
    <div className={styles.wrapper}>
      <ProfileHeader />
      <UserIdentityCard data={data} />
      <InfoGrid data={data} />
      <StatusBadges data={data} />
      <SignOutForm />
      {role ? (
        <Suspense fallback={<p>Loading admin panel...</p>}>
          <AdminSection />
        </Suspense>
      ) : null}
    </div>
  );
};

export default ProfilePage;
