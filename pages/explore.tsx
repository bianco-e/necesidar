import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import MainInput from "../components/MainInput";
import ExploreMainButtons from "../components/ExploreMainButtons";
import Cards from "../components/Cards";
import { PublicationData } from "../interfaces";
import PublicationsController from "../database/controllers/Publications.controllers";
import { useState } from "react";

interface IProps {
  urgentPublications?: PublicationData[];
}

const Explore: NextPage<IProps> = ({ urgentPublications }) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <Head>
        <title>necesidar - Explorar</title>
      </Head>
      <MainInput value={inputValue} valueSetter={setInputValue} />
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
