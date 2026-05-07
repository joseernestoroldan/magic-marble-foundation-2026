import ProfilePopover from "./ProfilePopover";
import { getSessionId, getNameSession } from "@/app/lib/sessions";

const Profile = async () => {
  let name: string | null = null;

  const userId = await getSessionId();

  if (userId) {
    name = await getNameSession(userId);
  }

  return <ProfilePopover name={name} />;
};

export default Profile;
