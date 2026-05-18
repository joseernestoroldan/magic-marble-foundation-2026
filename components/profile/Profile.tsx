import { getNameSession, getSessionId } from "@/app/lib/sessions";
import ProfilePopover from "./ProfilePopover";

const Profile = async () => {
  let name: string | null = null;

  const userId = await getSessionId();

  if (userId) {
    name = await getNameSession(userId);
  }

  return <ProfilePopover name={name} />;
};

export default Profile;
