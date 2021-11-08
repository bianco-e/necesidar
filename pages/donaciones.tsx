import type { NextPage } from "next";
import type { GeoData, PublicationData } from "../interfaces";
import Cards from "../components/Cards";
import DropdownFilters from "../components/DropdownFilters";
import Head from "next/head";
import MainInput from "../components/MainInput";
import PublicationsController from "../database/controllers/Publications.controllers";
import useFilters from "../hooks/useFilters";
import { useState } from "react";

interface IProps {
  initialDonations?: PublicationData[];
  provinces: GeoData;
}

const Donations: NextPage<IProps> = ({ initialDonations, provinces }) => {
  const [donations, setDonations] = useState<PublicationData[] | undefined>(
    initialDonations
  );
  const [inputValue, setInputValue] = useState<string>("");
  const { resetState, setField, state } = useFilters(setDonations, 1);

  return (
    <>
      <Head>
        <title>necesidar - Donaciones</title>
      </Head>
      <MainInput
        value={inputValue}
        valueSetter={setInputValue}
        variant="donations"
        onEnterDown={(v) => setField("title", inputValue)}
      />
      <DropdownFilters
        variant="donations"
        provinces={provinces.provincias}
        resetState={resetState}
        setField={setField}
        state={state}
      />
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
    const initialDonations = await PublicationsController.getPublicationsByType(
      1
    );
    return {
      props: {
        initialDonations,
        provinces,
      },
      revalidate: 50,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        initialDonations: null,
        provinces: null,
      },
    };
  }
}

export default Donations;
