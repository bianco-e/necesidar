import type { NextPage } from "next";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";
import Button from "../../components/Styled/Button";
import mocked_publications from "../../mocked_publications.json";

const ProfilePage: NextPage = () => {
  return (
    <Profile title="Mis Necesidades">
      <>
        <MyPublicationsMenu publications={mocked_publications.slice(0, 3)} />
        <Button size="md" variant="needs" onClick={() => {}}>
          Agregar Necesidad
        </Button>
      </>
    </Profile>
  );
};

export default ProfilePage;
