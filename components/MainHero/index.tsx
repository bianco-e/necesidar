import styled from "styled-components";
import Button from "../Styled/Button";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MainHero() {
  const { push } = useRouter();
  return (
    <Container>
      <img src="/images/hero-hands-image.png" alt="manos tendidas" />

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
            <Button
              onClick={() => push("/explore")}
              size="md"
              variant="primary"
              width="180px"
            >
              Explorar
            </Button>
          </Link>
          <Button onClick={() => {}} size="md" variant="needs" width="180px">
            Ingresar
          </Button>
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
  min-height: 830px;
  position: relative;
  width: 100%;
  > img {
    height: 830px;
    left: 0;
    position: absolute;
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
      font-size: 52px;
    }
    > h2 {
      margin: 0;
      font-size: 40px;
    }
    > p {
      font-size: 30px;
      width: 650px;
    }
    > div.buttons-container {
      align-items: center;
      display: flex;
      justify-content: space-between;
      width: 400px;
    }
  }
`;
