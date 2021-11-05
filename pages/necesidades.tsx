import type { NextPage } from "next";
import type { GeoData, PublicationData } from "../interfaces";
import Cards from "../components/Cards";
import DropdownFilters from "../components/DropdownFilters";
import Head from "next/head";
import MainInput from "../components/MainInput";
import PublicationsController from "../database/controllers/Publications.controllers";
import useFilters from "../hooks/useFilters";
import { useEffect, useState } from "react";

interface IProps {
  initialNeeds?: PublicationData[];
  provinces: GeoData;
}

const Needs: NextPage<IProps> = ({ initialNeeds, provinces }) => {
  const [needs, setNeeds] = useState<PublicationData[] | undefined>(
    initialNeeds
  );
  const [inputValue, setInputValue] = useState<string>("");
  const { setField, state } = useFilters();

  useEffect(() => {
    const body = JSON.stringify({
      filters: state,
      publication_type: 0,
    });
    fetch("/api/publications/filter", {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response) return setNeeds(response);
        return setNeeds([]);
      })
      .catch((e) => console.error(e));
  }, [state]);

  return (
    <>
      <Head>
        <title>necesidar - Necesidades</title>
      </Head>
      <MainInput
        value={inputValue}
        valueSetter={setInputValue}
        variant="needs"
        onEnterDown={(v) => setField("title", inputValue)}
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
    const initialNeeds = await PublicationsController.getPublicationsByType(0);
    return {
      props: {
        initialNeeds,
        provinces,
      },
      revalidate: 50,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        initialNeeds: null,
      },
    };
  }
}

export default Needs;
