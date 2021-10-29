import type { NextPage } from "next";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";
import mocked_publications from "../../mocked_publications.json";

const ProfileFavoritesPage: NextPage = () => {
  return (
    <Profile title="Mis Favoritos">
      <>
        <MyPublicationsMenu
          forFavorites={true}
          publications={mocked_publications.slice(0, 2)}
        />
      </>
    </Profile>
  );
};

export default ProfileFavoritesPage;
