import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/client";
import Profile from "../../components/Profile";
import ConfigurationMenu from "../../components/Profile/ConfigurationMenu";
import { SessionUser } from "../../interfaces";

interface IProps {
  user: SessionUser;
}

const ProfilePage: NextPage<IProps> = ({ user }) => {
  return (
    <Profile user={user} title="Configuración">
      <ConfigurationMenu />
    </Profile>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const session = await getSession(ctx);
    if (session) {
      return {
        props: {
          user: session.user,
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
