import type { GetServerSidePropsContext, NextPage } from "next";
import type { PublicationData, UserSession } from "../../interfaces";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";
import Button from "../../components/Styled/Button";
import PublicationsController from "../../database/controllers/Publications.controllers";

interface IProps {
  myDonations?: PublicationData[];
  session: UserSession;
}

const ProfilePage: NextPage<IProps> = ({ myDonations, session }) => {
  const router = useRouter();
  return (
    <Profile session={session} title="Mis Donaciones">
      <>
        <MyPublicationsMenu publications={myDonations} />
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
    const myDonations = await PublicationsController.getPublicationsByUserId(
      10,
      1
    );
    const session = await getSession(ctx);
    if (session)
      return {
        props: {
          session,
          myDonations,
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

export default ProfilePage;
