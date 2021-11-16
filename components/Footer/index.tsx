import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import Logo from "../Styled/Logo";
import { LARGE_BREAKPOINT, SMALL_BREAKPOINT } from "../../utils/constants";
import Modal from "../Styled/Modal";
import AboutUsModalContent from "../AboutUseModalContent";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <FooterWrapper>
        <FooterContainer>
          <Logo />
          <Link href="/">
            <a>Términos y condiciones</a>
          </Link>
          <button onClick={() => setIsModalOpen(true)}>
            ¿Qué es necesidar?
          </button>
          <Link href="/feedback">
            <a>Sugerir cambios</a>
          </Link>
          <a
            className="twitter-logo"
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              alt="twitter"
              height={45}
              width={45}
              src="https://i.pinimg.com/originals/c1/7f/11/c17f11f39dd7df48f8b54604b1745ee7.png"
            />
          </a>
        </FooterContainer>
      </FooterWrapper>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <AboutUsModalContent />
      </Modal>
    </>
  );
}

const FooterWrapper = styled.footer`
  align-items: center;
  background: ${({ theme }) => theme.not_black};
  display: flex;
  height: 120px;
  justify-content: center;
  width: 100%;
  @media (max-width: ${LARGE_BREAKPOINT}) {
    height: 220px;
  }
`;

const FooterContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: ${({ theme }) => theme.desktop_container};
  > a,
  button {
    background: none;
    border: 0;
    color: ${({ theme }) => theme.white};
    cursor: pointer;
    font-size: 14px;
    > img {
      cursor: pointer;
    }
  }
  @media (max-width: ${LARGE_BREAKPOINT}) {
    flex-direction: column;
    height: 220px;
    width: ${({ theme }) => theme.tablet_container};
    > a.twitter-logo {
      margin-top: 10px;
    }
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    width: ${({ theme }) => theme.mobile_container};
  }
`;
