import type { NextPage } from "next";
import Head from "next/head";
import Cards from "../components/Cards";
import DropdownFilters from "../components/DropdownFilters";
import MainInput from "../components/MainInput";
import PublicationsController from "../database/controllers/Publications.controllers";
import { PublicationData } from "../interfaces";

interface IProps {
  needs?: PublicationData[];
}

const Needs: NextPage<IProps> = ({ needs }) => {
  return (
    <>
      <Head>
        <title>necesidar - Necesidades</title>
      </Head>
      <MainInput variant="needs" />
      <DropdownFilters variant="needs" provinces={[]} />
      <Cards publicationsData={needs} />
    </>
  );
};

export async function getStaticProps() {
  try {
    const needs = await PublicationsController.getPublicationsByType(0);
    return {
      props: {
        needs,
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        needs: null,
      },
      revalidate: 10,
    };
  }
}

export default Needs;
