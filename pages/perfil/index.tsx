import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/client";
import Profile from "../../components/Profile";
import ConfigurationMenu from "../../components/Profile/ConfigurationMenu";
import { Geo, SessionUser } from "../../interfaces";

interface IProps {
  user: SessionUser;
  provinces: Geo[];
}

const ProfilePage: NextPage<IProps> = ({ provinces, user }) => {
  return (
    <Profile user={user} title="Configuración">
      <ConfigurationMenu provinces={provinces} user={user} />
    </Profile>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const provincesResponse = await fetch(
      "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre"
    );
    const provinces = await provincesResponse.json();
    const session = await getSession(ctx);
    if (session) {
      return {
        props: {
          user: session.user,
          provinces: provinces.provincias,
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
