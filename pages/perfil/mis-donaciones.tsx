import type { GetServerSidePropsContext, NextPage } from "next";
import type { PublicationData, SessionUser } from "../../interfaces";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";
import Button from "../../components/Styled/Button";
import PublicationsController from "../../database/controllers/Publications.controllers";

interface IProps {
  myDonations?: PublicationData[];
  user: SessionUser;
}

const ProfilePage: NextPage<IProps> = ({ myDonations, user }) => {
  const router = useRouter();
  return (
    <Profile user={user} title="Mis Donaciones">
      <>
        <MyPublicationsMenu publications={myDonations} user={user} />
        <Button
          size="md"
          variant="donations"
          onClick={() => router.push("/publicar?type=2")}
        >
          Agregar Donación
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
      const myDonations = await PublicationsController.getPublicationsByUserId(
        user.user_id,
        1
      );
      return {
        props: {
          user: user,
          myDonations,
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
