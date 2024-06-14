import { FC, useEffect } from "react";
import { UserProfile } from "@root/features/UserProfile";
import { useEvent } from "@owcaofficial/web-analytics";

export const Profile: FC = () => {
  const sendEvent = useEvent();
  useEffect(() => {
    sendEvent("profile_action", "visit_profile");
  }, []);
  return <UserProfile />;
};
