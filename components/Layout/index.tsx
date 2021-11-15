import Head from "next/head";
import NavBar from "../NavBar";
import styled from "styled-components";
import Footer from "../Footer";
import { SMALL_BREAKPOINT } from "../../utils/constants";

interface IProps {
  children: JSX.Element;
}

export default function Layout({ children }: IProps) {
  return (
    <>
      <Head>
        <title>necesidar</title>
        <meta name="description" content="necesidar" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,600;0,800;1,300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NavBar />
      <LayoutContainer>{children}</LayoutContainer>
      <Footer />
    </>
  );
}

const LayoutContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 110px 0 0 0;
  min-height: calc(100vh - 120px);
  width: 100%;
  @media (max-width: ${SMALL_BREAKPOINT}) {
    padding: 150px 0 0 0;
  }
`;
