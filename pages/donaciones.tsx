import type { NextPage } from "next";
import Head from "next/head";
import MainInput from "../components/MainInput";
import DropdownFilters from "../components/DropdownFilters";
import Cards from "../components/Cards";
import PublicationsController from "../database/controllers/Publications.controllers";
import { GeoData, PublicationData } from "../interfaces";

interface IProps {
  donations?: PublicationData[];
  provinces: GeoData;
}

const Donations: NextPage<IProps> = ({ donations, provinces }) => {
  return (
    <>
      <Head>
        <title>necesidar - Donaciones</title>
      </Head>
      <MainInput variant="donations" />
      <DropdownFilters variant="donations" provinces={provinces.provincias} />
      <Cards publicationsData={donations} />
    </>
  );
};

export async function getStaticProps() {
  try {
    const provincesResponse = await fetch(
      "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre"
    );
    const provinces = await provincesResponse.json();
    const donations = await PublicationsController.getPublicationsByType(1);
    return {
      props: {
        donations,
        provinces,
      },
      revalidate: 20,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        donations: null,
        provinces: null,
      },
    };
  }
}

export default Donations;
