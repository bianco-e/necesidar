import type { PublicationsFilters } from "../../interfaces";

export const SET_FIELD = "SET_FIELD";
export const SET_SLICE = "SET_SLICE";
export const RESET_STATE = "RESET_STATE";

export const filtersInitialState: PublicationsFilters = {
  province: undefined,
  city: undefined,
  category: undefined,
  title: undefined,
};

export const filtersReducer = (
  state = filtersInitialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case SET_FIELD:
      return { ...state, [action.payload.field]: action.payload.value };
    case SET_SLICE:
      return { ...state, ...action.payload };
    case RESET_STATE:
      return { province: "", city: "", category: "", title: "" };
    default:
      return state;
  }
};
