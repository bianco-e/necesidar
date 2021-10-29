import styled from "styled-components";
import Button from "../Styled/Button";
import Logo from "../Styled/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const { push } = useRouter();
  return (
    <NavBarWrapper>
      <NavBarContainer>
        <Link href="/">
          <a>
            <Logo cursor="pointer" />
          </a>
        </Link>
        <div className="buttons-container">
          <Button
            onClick={() => push("/explore")}
            size="md"
            variant="primary"
            width="180px"
          >
            Explorar
          </Button>
          <Button
            onClick={() => push("/perfil")}
            size="md"
            variant="needs"
            width="180px"
          >
            Ingresar
          </Button>
        </div>
      </NavBarContainer>
    </NavBarWrapper>
  );
}

const NavBarWrapper = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.white};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  height: 70px;
  left: 0;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const NavBarContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  width: ${({ theme }) => theme.desktop_container};
  > div.buttons-container {
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
