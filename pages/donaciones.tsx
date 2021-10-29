import type { NextPage } from "next";
import Head from "next/head";
import MainInput from "../components/MainInput";
import DropdownFilters from "../components/DropdownFilters";
import Cards from "../components/Cards";
import mocked_publications from "../mocked_publications.json";

const Donations: NextPage = () => {
  return (
    <>
      <Head>
        <title>necesidar - Donaciones</title>
      </Head>
      <MainInput variant="donations" />
      <DropdownFilters variant="donations" />
      <Cards
        publicationsData={mocked_publications.filter((p) => !p.is_urgent)}
      />
    </>
  );
};

export default Donations;
