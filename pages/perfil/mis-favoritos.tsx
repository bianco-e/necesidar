import type { GetServerSidePropsContext, NextPage } from "next";
import type { PublicationData, UserSession } from "../../interfaces";
import { getSession } from "next-auth/client";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";
import PublicationsController from "../../database/controllers/Publications.controllers";

interface IProps {
  myFavorites?: PublicationData[];
  session: UserSession;
}

const ProfileFavoritesPage: NextPage<IProps> = ({ myFavorites, session }) => {
  return (
    <Profile session={session} title="Mis Favoritos">
      <>
        <MyPublicationsMenu forFavorites={true} publications={[]} />
      </>
    </Profile>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const myFavorites = await PublicationsController.getPublicationsByUserId(
      10,
      0
    );
    const session = await getSession(ctx);
    if (session)
      return {
        props: {
          session,
          myFavorites,
        },
      };
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
