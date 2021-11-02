import type { NextPage } from "next";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";
import Button from "../../components/Styled/Button";
import { getPublicationsByUserId } from "../../database";
import { PublicationData } from "../../interfaces";

interface IProps {
  myNeeds?: PublicationData[];
}

const ProfilePage: NextPage<IProps> = ({ myNeeds }) => {
  return (
    <Profile title="Mis Necesidades">
      <>
        <MyPublicationsMenu publications={myNeeds} />
        <Button size="md" variant="needs" onClick={() => {}}>
          Agregar Necesidad
        </Button>
      </>
    </Profile>
  );
};

export async function getStaticProps() {
  try {
    const myNeeds = await getPublicationsByUserId(10, 0);
    return {
      props: {
        myNeeds,
      },
      revalidate: 30,
    };
  } catch (e) {
    console.error(e);
    return {
      props: { myNeeds: null },
      revalidate: 30,
    };
  }
}

export default ProfilePage;
