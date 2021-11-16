import styled from "styled-components";
import { SMALL_BREAKPOINT } from "../../utils/constants";
import Logo from "../Styled/Logo";

export default function AboutUsModalContent() {
  return (
    <Wrapper>
      <span className="title">¿Qué es {<Logo />}?</span>
      <p>
        necesidar es una red social de ayuda para
        <strong> publicar objetos del cuidado de la salud</strong> que puedan
        ser <strong> útiles para alguien más</strong>
      </p>
      <p className="question">¿Cómo hago para usar necesidar?</p>
      <p>
        Podes ver todas las donaciones y necesidades publicadas sin necesidad de
        tener una cuenta. Para <b>publicar</b> o <b>contactar</b> con alguien
        más podes iniciar sesión con tu cuenta de Google.
      </p>
      <p className="question">¿Tengo que pagar por usarlo?</p>
      <p>
        No, necesidar es <b>totalmente gratis.</b>
      </p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 320px;
  width: 500px;
  > span.title {
    font-size: 36px;
    font-weight: bold;
    margin: 0;
    text-align: center;
    > div {
      display: inline;
    }
  }
  > p {
    font-size: 16px;
  }
  > p.question {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
    text-align: center;
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    width: 280px;
    > h1.title {
      font-size: 32px;
    }
  }
`;
