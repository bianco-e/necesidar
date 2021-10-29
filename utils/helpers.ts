import React from "react";

export const ellipseText = (text: string, length: number): string =>
  text.length > length ? `${text.substring(0, length)}...` : text;

export const getDaysDifference = (
  initialDate: number,
  finalDate: number
): number => {
  const hoursDiff = (finalDate - initialDate) / 1000 / 60 / 60;
  return hoursDiff < 24 ? 0 : Math.round(hoursDiff / 24);
};

export const checkKeyDown = (
  e: React.KeyboardEvent,
  key: string,
  callback: () => void
) => (e.key === key ? callback() : null);
