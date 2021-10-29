import type { NextPage } from "next";
import Head from "next/head";
import MainInput from "../components/MainInput";
import ExploreMainButtons from "../components/ExploreMainButtons";
import mocked_publications from "../mocked_publications.json";
import Cards from "../components/Cards";

const Explore: NextPage = () => {
  return (
    <>
      <Head>
        <title>necesidar - Explorar</title>
      </Head>
      <MainInput />
      <ExploreMainButtons />
      <Cards
        publicationsData={mocked_publications.filter((p) => p.is_urgent)}
        title="Necesidades urgentes"
      />
    </>
  );
};

export default Explore;
