import { getAllData } from "@/client";
import AdminSectionClient from "./AdminSectionClient";

const AdminSection = async () => {
  const diaries = await getAllData("dairies") ?? [];
  return <AdminSectionClient diaries={diaries} />;
};

export default AdminSection;
