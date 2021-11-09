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
