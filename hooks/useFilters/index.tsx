import type { PublicationData } from "../../interfaces";
import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { querifyObject } from "../../utils/helpers";
import {
  filtersInitialState,
  filtersReducer,
  RESET_STATE,
  SET_FIELD,
  SET_SLICE,
} from "./reducer";

type Setter = (data: PublicationData[] | undefined) => void;
type PublicationType = number;

export default function useFilters(
  setter: Setter,
  publicationType: PublicationType
) {
  const [state, dispatch] = useReducer(filtersReducer, filtersInitialState);
  const router = useRouter();

  const resetState = () => dispatch({ type: RESET_STATE });

  const setField = (field: string, value?: string) =>
    dispatch({ type: SET_FIELD, payload: { field, value } });

  const fetchWithFilters = () => {
    const body = JSON.stringify({
      filters: state,
      publication_type: publicationType,
    });
    fetch("/api/publications/filter", {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response", response);
        if (response) return setter(response);
        return setter([]);
      })
      .catch((e) => console.error("Error: ", e));
  };

  useEffect(() => {
    console.log("outter state", state);
    if (Object.values(state).some((f) => f !== undefined)) {
      console.log(state);
      fetchWithFilters();
    }
    const query = querifyObject(Object.entries(state));
    router.push({ search: query });
  }, [state.province, state.city, state.category, state.title]);

  useEffect(() => {
    const parsedQuery = Object.entries(router.query).reduce(
      (acc, [fieldName, value]) => {
        if (state[fieldName] === "" || state[fieldName] !== value)
          return { ...acc, [fieldName]: value };
        return acc;
      },
      {}
    );
    if (Object.values(parsedQuery).some((f) => f)) {
      dispatch({ type: SET_SLICE, payload: parsedQuery });
    }
  }, [
    router.query.province,
    router.query.city,
    router.query.category,
    router.query.title,
  ]);

  return { resetState, setField, state };
}
