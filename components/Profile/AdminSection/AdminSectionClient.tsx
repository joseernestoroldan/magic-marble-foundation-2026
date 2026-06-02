"use client";

import dynamic from "next/dynamic";
import styles from "./AdminSection.module.css";

const ShowUsersList = dynamic(
  () => import("@/components/Profile/ShowUsersList/ShowUsersList"),
  { ssr: false }
);

const NotifyDiaries = dynamic(
  () => import("@/components/Profile/NotifyDiaries/NotifyDiaries"),
  { ssr: false }
);

const Donators = dynamic(
  () => import("@/components/Profile/Donators/Donators"),
  { ssr: false }
);

interface AdminSectionClientProps {
  diaries: unknown[];
}

const AdminSectionClient = ({ diaries }: AdminSectionClientProps) => (
  <section className={styles.section}>
    <ShowUsersList />
    <NotifyDiaries diaries={diaries} />
    <Donators />
  </section>
);

export default AdminSectionClient;
