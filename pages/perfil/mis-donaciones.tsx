import type { NextPage } from "next";
import Profile from "../../components/Profile";
import MyPublicationsMenu from "../../components/Profile/MyPublicationsMenu";
import Button from "../../components/Styled/Button";
import PublicationsController from "../../database/controllers/Publications.controllers";
import { PublicationData } from "../../interfaces";

interface IProps {
  myDonations?: PublicationData[];
}

const ProfilePage: NextPage<IProps> = ({ myDonations }) => {
  return (
    <Profile title="Mis Donaciones">
      <>
        <MyPublicationsMenu publications={myDonations} />
        <Button size="md" variant="donations" onClick={() => {}}>
          Agregar Donación
        </Button>
      </>
    </Profile>
  );
};

export async function getStaticProps() {
  try {
    const myDonations = await PublicationsController.getPublicationsByUserId(
      10,
      1
    );
    return {
      props: {
        myDonations,
      },
      revalidate: 30,
    };
  } catch (e) {
    console.error(e);
    return {
      props: { myDonations: null },
      revalidate: 30,
    };
  }
}

export default ProfilePage;
