import type { NextPage } from "next";
import Profile from "../../components/Profile";
import ConfigurationMenu from "../../components/Profile/ConfigurationMenu";

const ProfilePage: NextPage = () => {
  return (
    <Profile title="Configuración">
      <ConfigurationMenu />
    </Profile>
  );
};

export default ProfilePage;
