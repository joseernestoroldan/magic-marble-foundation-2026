import ProfilePopover from "./ProfilePopover"
import { getSessionId, getNameSession } from "@/app/lib/sessions";

const Profile = async () => {
  const userId = await getSessionId();
  const name = await getNameSession(userId);
  return <ProfilePopover name={name}/>
}

export default Profile