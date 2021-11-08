import type { PublicationsFilters } from "../../interfaces";

export const parseFiltersToSQLQuery = (filters: PublicationsFilters) =>
  Object.entries(filters)
    .map(([filterName, value]) =>
      value
        ? filterName === "title"
          ? `AND LOWER(p.title) LIKE LOWER('%${value}%')`
          : `AND p.${filterName} = '${value}'`
        : ""
    )
    .join("");
