import type { PublicationsFilters } from "../../interfaces";

export const parseFiltersToSQLQuery = (filters: PublicationsFilters) =>
  Object.entries(filters)
    .map(([filterName, value]) =>
      value ? `AND p.${filterName} = '${value}'` : ""
    )
    .join("");
