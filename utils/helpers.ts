import type { Geo } from "../interfaces";
import React from "react";

// STRING HELPERS
export const capitalizeString = (s: string): string =>
  `${s.charAt(0).toUpperCase()}${s.slice(1).toLowerCase()}`;

export const ellipseText = (text: string, length: number): string =>
  text.length > length ? `${text.substring(0, length)}...` : text;

// QUERY STRING HELPERS
export const querifyObject = (values: string[][]): string =>
  values
    .filter(([fN, value]) => value)
    .map(([filterName, value], idx) =>
      idx === 0 ? `?${filterName}=${value}` : `&${filterName}=${value}`
    )
    .join("");

// DATE HELPERS
export const getDaysDifference = (
  initialDate: number,
  finalDate: number
): number => {
  const hoursDiff = (finalDate - initialDate) / 1000 / 60 / 60;
  return hoursDiff < 24 ? 0 : Math.round(hoursDiff / 24);
};

// EVENT HELPERS
export const checkKeyDown = (
  e: React.KeyboardEvent,
  key: string,
  callback: () => void
) => (e.key === key ? callback() : null);

//GEO DATA HELPERS
export const parseGeoData = (
  firstElement: { name: string; onSelection: () => void },
  geoData: Geo[],
  callback: (n: string, id: string) => void
) => {
  return [firstElement].concat(
    geoData
      .sort((a: Geo, b: Geo) => {
        if (a.nombre < b.nombre) return -1;
        if (a.nombre > b.nombre) return 1;
        return 0;
      })
      .map((p) => ({
        id: p.id,
        name: p.nombre,
        onSelection: () => {
          callback(p.nombre, p.id);
        },
      }))
  );
};

export const fetchCities = (setter: (data: Geo[]) => void, id: string) => {
  const route = `https://apis.datos.gob.ar/georef/api/localidades?provincia=${id}&campos=id,nombre&max=350`;
  fetch(route)
    .then((res) => res.json())
    .then((res) => {
      if (res)
        return setter(
          res.localidades.map((l: Geo) => ({
            ...l,
            nombre: capitalizeString(l.nombre),
          }))
        );
      return setter([]);
    });
};

//IMAGES HELPERS
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackImage: string
) => {
  const target = e.target as HTMLImageElement;
  target.setAttribute("src", fallbackImage);
};
