import type { NextPage } from "next";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";

const ProfileFavoritesPage: NextPage = () => {
  return (
    <Profile title="Mis Favoritos">
      <>
        <MyPublicationsMenu forFavorites={true} publications={[]} />
      </>
    </Profile>
  );
};

export default ProfileFavoritesPage;
