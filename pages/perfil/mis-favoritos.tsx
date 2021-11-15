import type { GetServerSidePropsContext, NextPage } from "next";
import type { PublicationData, SessionUser } from "../../interfaces";
import { getSession } from "next-auth/client";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";
import FavoritesController from "../../database/controllers/Favorites.controllers";

interface IProps {
  myFavorites: PublicationData[];
  user: SessionUser;
}

const ProfileFavoritesPage: NextPage<IProps> = ({ myFavorites, user }) => {
  return (
    <Profile user={user} title="Mis Favoritos">
      <>
        <MyPublicationsMenu
          forFavorites={true}
          publications={myFavorites}
          user={user}
        />
      </>
    </Profile>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const session = await getSession(ctx);
    if (session) {
      const { user } = session;
      const myFavorites = user.user_id
        ? await FavoritesController.getUserFavorites(user.user_id)
        : [];
      return {
        props: {
          user: user,
          myFavorites,
        },
      };
    }
    return {
      redirect: {
        permanent: false,
        destination: "/explore",
      },
    };
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        permanent: false,
        destination: "/explore",
      },
    };
  }
}

export default ProfileFavoritesPage;
