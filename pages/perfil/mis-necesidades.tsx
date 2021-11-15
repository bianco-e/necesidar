import type { GetServerSidePropsContext, NextPage } from "next";
import type { PublicationData, SessionUser } from "../../interfaces";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";
import Button from "../../components/Styled/Button";
import PublicationsController from "../../database/controllers/Publications.controllers";

interface IProps {
  myNeeds?: PublicationData[];
  user: SessionUser;
}

const ProfilePage: NextPage<IProps> = ({ myNeeds, user }) => {
  const router = useRouter();
  return (
    <Profile user={user} title="Mis Necesidades">
      <>
        <MyPublicationsMenu publications={myNeeds} user={user} />
        <Button
          size="md"
          variant="needs"
          onClick={() => router.push("/publicar?type=1")}
        >
          Agregar Necesidad
        </Button>
      </>
    </Profile>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const session = await getSession(ctx);
    if (session) {
      const { user } = session;
      const myNeeds = await PublicationsController.getPublicationsByUserId(
        user.user_id,
        0
      );
      return {
        props: {
          user: user,
          myNeeds,
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

export default ProfilePage;
