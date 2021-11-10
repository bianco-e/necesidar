import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import Profile from "../../components/Profile";
import ConfigurationMenu from "../../components/Profile/ConfigurationMenu";

const ProfilePage: NextPage = () => {
  const [session] = useSession();

  return (
    <Profile session={session} title="Configuración">
      <ConfigurationMenu />
    </Profile>
  );
};

export default ProfilePage;
