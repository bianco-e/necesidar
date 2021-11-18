import type { GetServerSidePropsContext, NextPage } from "next";
import type { UTM } from "../interfaces";
import MainInput from "../components/MainInput";
import MainHero from "../components/MainHero";
import ActionsControllers from "../database/controllers/Actions.controllers";
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const userAgent = ctx.req.headers["user-agent"];
  ActionsControllers.trackAction(
    "visit-landing",
    ctx.query,
    undefined,
    userAgent
  );
  return {
    props: {},
  };
}

export default Home;
