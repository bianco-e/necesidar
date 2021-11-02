import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import MainInput from "../components/MainInput";
import DropdownFilters from "../components/DropdownFilters";
import Cards from "../components/Cards";
import { getPublicationsByType } from "../database";
import { PublicationData } from "../interfaces";

interface IProps {
  donations?: PublicationData[];
}

const Donations: NextPage<IProps> = ({ donations }) => {
  return (
    <>
      <Head>
        <title>necesidar - Donaciones</title>
      </Head>
      <MainInput variant="donations" />
      <DropdownFilters variant="donations" />
      <Cards publicationsData={donations} />
    </>
  );
};

export async function getStaticProps(ctx: NextPageContext) {
  try {
    const donations = await getPublicationsByType(1);
    return {
      props: {
        donations,
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        donations: null,
      },
      revalidate: 10,
    };
  }
}

export default Donations;
