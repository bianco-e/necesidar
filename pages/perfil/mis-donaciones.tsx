import type { NextPage } from "next";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";
import Button from "../../components/Styled/Button";
import mocked_publications from "../../mocked_publications.json";

const ProfilePage: NextPage = () => {
  return (
    <Profile title="Mis Donaciones">
      <>
        <MyPublicationsMenu publications={mocked_publications.slice(6)} />
        <Button size="md" variant="donations" onClick={() => {}}>
          Agregar Donación
        </Button>
      </>
    </Profile>
  );
};

export default ProfilePage;
