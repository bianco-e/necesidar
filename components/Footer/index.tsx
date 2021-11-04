import styled from "styled-components";
import Link from "next/link";
import Logo from "../Styled/Logo";

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <Logo />
        <Link href="/">
          <a>Términos y condiciones</a>
        </Link>
        <Link href="/">
          <a>¿Qué es necesidar?</a>
        </Link>
        <Link href="/">
          <a>Sugerir cambios</a>
        </Link>
        <a href="https://www.twitter.com" target="_blank">
          <img
            alt="twitter"
            src="https://i.pinimg.com/originals/c1/7f/11/c17f11f39dd7df48f8b54604b1745ee7.png"
          />
        </a>
      </FooterContainer>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  align-items: center;
  background: ${({ theme }) => theme.not_black};
  display: flex;
  height: 120px;
  justify-content: center;
  width: 100%;
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
    font-size: 14px;
    > img {
      cursor: pointer;
      height: 45px;
      width: 45px;
    }
  }
`;
