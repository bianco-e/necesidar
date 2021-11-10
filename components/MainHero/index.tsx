import styled from "styled-components";
import { signIn, useSession } from "next-auth/client";
import Button from "../Styled/Button";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MainHero() {
  const [session, loading] = useSession();
  const { push } = useRouter();
  return (
    <Container>
      <img alt="manos tendidas" src="/images/hero-hands-image.png" />

      <div className="content">
        <h1>¡Publicá en necesidar!</h1>
        <h2>Alguien necesita tu ayuda.</h2>
        <h2>Alguien puede ayudarte.</h2>
        <p>
          necesidar es una red social de ayuda para
          <strong> publicar objetos del cuidado de la salud</strong> que puedan
          ser <strong> útiles para alguien más</strong>
        </p>
        <div className="buttons-container">
          <Link href="/explore">
            <a>
              <Button
                onClick={() => push("/explore")}
                size="md"
                variant="primary"
                width="180px"
              >
                Explorar
              </Button>
            </a>
          </Link>
          {!session && !loading ? (
            <Button
              onClick={() => signIn()}
              size="md"
              variant="needs"
              width="180px"
            >
              Ingresar
            </Button>
          ) : (
            <Button
              onClick={() => push("/publicar")}
              size="md"
              variant="needs"
              width="180px"
            >
              Publicar
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  background: rgb(255, 124, 112, 0.4);
  color: ${({ theme }) => theme.white};
  display: flex;
  min-height: 550px;
  overflow: hidden;
  position: relative;
  width: 100%;
  > img {
    height: 550px;
    left: 0;
    position: absolute;
    object-fit: cover;
    width: 830px;
  }
  > div.content {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    margin: auto;
    text-align: end;
    width: ${({ theme }) => theme.desktop_container};
    > h1 {
      font-size: 48px;
    }
    > h2 {
      margin: 0;
      font-size: 36px;
    }
    > p {
      font-size: 30px;
      width: 650px;
    }
    > div.buttons-container {
      align-items: center;
      display: flex;
      justify-content: space-between;
      > button {
        margin-left: 40px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
`;
