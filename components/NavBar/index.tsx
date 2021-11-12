import styled from "styled-components";
import Button from "../Styled/Button";
import Logo from "../Styled/Logo";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import UserDropdownMenu from "./UserDropdownMenu";
import { LARGE_BREAKPOINT, SMALL_BREAKPOINT } from "../../utils/constants";

export default function NavBar() {
  const [session, loading] = useSession();

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
          {!session ? (
            <Button
              onClick={() => signIn()}
              margin="0 0 0 40px"
              size="md"
              variant="needs"
              width="180px"
            >
              Ingresar
            </Button>
          ) : (
            <UserDropdownMenu session={session} signOut={signOut} />
          )}
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
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: ${LARGE_BREAKPOINT}) {
    width: ${({ theme }) => theme.tablet_container};
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    width: ${({ theme }) => theme.mobile_container};
  }
`;
