import type { PublicationData, PublicationsFilters } from "../interfaces";
import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";

const SET_FIELD = "SET_FIELD";
const SET_SLICE = "SET_SLICE";
const RESET_STATE = "RESET_STATE";

type Setter = (data: PublicationData[] | undefined) => void;
type PublicationType = number;

const initialState: PublicationsFilters = {
  province: "",
  city: "",
  category: "",
  title: "",
};

const reducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case SET_FIELD:
      return { ...state, [action.payload.field]: action.payload.value };
    case SET_SLICE:
      return { ...state, ...action.payload };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

const querify = (values: string[][]): string =>
  values
    .filter(([fN, value]) => value)
    .map(([filterName, value], idx) =>
      idx === 0 ? `?${filterName}=${value}` : `&${filterName}=${value}`
    )
    .join("");

export default function useFilters(
  setter: Setter,
  publicationType: PublicationType
) {
  const [state, dispatch] = useReducer(reducer, initialState);
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
        if (response) return setter(response);
        return setter([]);
      })
      .catch((e) => console.error(e));
  };

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
  }, [router.query]);

  useEffect(() => {
    fetchWithFilters();
    if (Object.values(state).some((f) => f)) {
      const query = querify(Object.entries(state));
      router.push({ search: query });
    } else router.push({ search: "" });
  }, [state.province, state.city, state.category, state.title]);

  return { resetState, setField, state };
}
