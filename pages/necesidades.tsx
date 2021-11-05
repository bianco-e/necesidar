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
  needs?: PublicationData[];
  provinces: GeoData;
}

const Needs: NextPage<IProps> = ({ needs, provinces }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { setField, state } = useFilters();

  return (
    <>
      <Head>
        <title>necesidar - Necesidades</title>
      </Head>
      <MainInput
        value={inputValue}
        valueSetter={setInputValue}
        variant="needs"
        onEnterDown={(v) => setField("searchValue", inputValue)}
      />
      <DropdownFilters
        variant="needs"
        provinces={provinces.provincias}
        setField={setField}
        state={state}
      />
      <Cards publicationsData={needs} />
    </>
  );
};

export async function getStaticProps() {
  try {
    const provincesResponse = await fetch(
      "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre"
    );
    const provinces = await provincesResponse.json();
    const needs = await PublicationsController.getPublicationsByType(0);
    return {
      props: {
        needs,
        provinces,
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
