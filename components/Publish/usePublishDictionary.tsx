import { useEffect, useState } from "react";
import globalTheme from "../../styles/globalTheme";

interface Dictionary {
  color: string[];
  title: string[];
}

export const dictionary: Dictionary = {
  title: ["necesidad", "donación", "publicación"],
  color: [
    globalTheme.primary_red,
    globalTheme.primary_green,
    globalTheme.dark_gray,
  ],
};

type Keyword = keyof typeof dictionary;
type PublicationType = number | undefined;

export default function usePublishDictionary(
  keyword: Keyword,
  publicationType: PublicationType
) {
  const [word, setWord] = useState<string>("");

  useEffect(() => {
    if (publicationType !== undefined) {
      setWord(dictionary[keyword][publicationType - 1]);
    } else setWord(dictionary[keyword][2]);
  }, [publicationType]);

  return word;
}
