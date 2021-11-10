import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/client";
import Profile from "../../components/Profile";
import ConfigurationMenu from "../../components/Profile/ConfigurationMenu";

interface IProps {
  session: any;
}

const ProfilePage: NextPage<IProps> = ({ session }) => {
  return (
    <Profile session={session} title="Configuración">
      <ConfigurationMenu />
    </Profile>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const session = await getSession(ctx);
    if (session)
      return {
        props: {
          session,
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
