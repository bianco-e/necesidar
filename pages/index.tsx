import type { NextPage } from "next";
import MainInput from "../components/MainInput";
import MainHero from "../components/MainHero";
import { useState } from "react";

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <MainInput value={inputValue} valueSetter={setInputValue} />
      <MainHero />
    </>
  );
};

export default Home;
