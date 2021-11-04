import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import MainInput from "../components/MainInput";
import ExploreMainButtons from "../components/ExploreMainButtons";
import Cards from "../components/Cards";
import { PublicationData } from "../interfaces";
import PublicationsController from "../database/controllers/Publications.controllers";

interface IProps {
  urgentPublications?: PublicationData[];
}

const Explore: NextPage<IProps> = ({ urgentPublications }) => {
  return (
    <>
      <Head>
        <title>necesidar - Explorar</title>
      </Head>
      <MainInput />
      <ExploreMainButtons />
      <Cards
        publicationsData={urgentPublications}
        title="Necesidades urgentes"
      />
    </>
  );
};

export async function getStaticProps(ctx: NextPageContext) {
  try {
    const urgentPublications =
      await PublicationsController.getMostRecentUrgentNeeds();
    return {
      props: {
        urgentPublications,
      },
      revalidate: 30,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        urgentPublications: null,
      },
      revalidate: 30,
    };
  }
}

export default Explore;
