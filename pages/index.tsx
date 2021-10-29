import type { NextPage } from "next";
import MainInput from "../components/MainInput";
import MainHero from "../components/MainHero";

const Home: NextPage = () => {
  return (
    <>
      <MainInput />
      <MainHero />
    </>
  );
};

export default Home;
