import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { getSession } from "next-auth/client";
import Publish from "../components/Publish";

const PublishPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>necesidar - Publicar</title>
      </Head>
      <Publish />
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const session = await getSession(ctx);
    if (session)
      return {
        props: {
          session,
        },
      };
    return {
      redirect: {
        permanent: false,
        destination: "/explore",
      },
    };
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        permanent: false,
        destination: "/explore",
      },
    };
  }
}

export default PublishPage;
