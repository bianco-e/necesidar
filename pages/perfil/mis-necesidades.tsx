import type { GetServerSidePropsContext, NextPage } from "next";
import type { PublicationData, Session } from "../../interfaces";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";
import Button from "../../components/Styled/Button";
import PublicationsController from "../../database/controllers/Publications.controllers";

interface IProps {
  myNeeds?: PublicationData[];
  session: Session;
}

const ProfilePage: NextPage<IProps> = ({ myNeeds, session }) => {
  const router = useRouter();
  return (
    <Profile session={session} title="Mis Necesidades">
      <>
        <MyPublicationsMenu publications={myNeeds} />
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
    const myNeeds = await PublicationsController.getPublicationsByUserId(10, 0);
    const session = await getSession(ctx);
    if (session)
      return {
        props: {
          session,
          myNeeds,
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
