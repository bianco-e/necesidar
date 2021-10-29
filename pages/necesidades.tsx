import type { NextPage } from "next";
import Head from "next/head";
import Cards from "../components/Cards";
import DropdownFilters from "../components/DropdownFilters";
import MainInput from "../components/MainInput";
import mocked_publications from "../mocked_publications.json";

const Needs: NextPage = () => {
  return (
    <>
      <Head>
        <title>necesidar - Necesidades</title>
      </Head>
      <MainInput variant="needs" />
      <DropdownFilters variant="needs" />
      <Cards publicationsData={mocked_publications} />
    </>
  );
};

export default Needs;
