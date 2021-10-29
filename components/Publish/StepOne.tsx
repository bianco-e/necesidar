import type { PublishState } from "./reducer";
import styled from "styled-components";
import Button from "../Styled/Button";
import Input from "../Styled/Input";
import Textarea from "../Styled/Textarea";
import { useEffect, useState } from "react";
import usePublishDictionary from "./usePublishDictionary";

interface IProps {
  setField: (field: string, value: any) => void;
  state: PublishState;
}

export default function StepOne({ setField, state }: IProps) {
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>(true);

  const fieldsForValidation = [
    state.title,
    state.description,
    state.publicationType,
  ];

  useEffect(() => {
    if (fieldsForValidation.every((field) => field)) {
      setIsContinueDisabled(false);
    } else setIsContinueDisabled(true);
  }, [...fieldsForValidation]);

  return (
    <>
      <Title>Tipo de publicación</Title>
      <SubTitle>
        Elegí si tu publicación es algo que vas a donar, o algo que necesitas
      </SubTitle>
      <Container justifyContent="space-evenly">
        <CardButton
          isSelected={state.publicationType === 1}
          variant="needs"
          onClick={() => setField("publicationType", 1)}
        >
          <span>Necesidad</span>
          <img alt="necesidad" src="/icons/explore-receiving-hand-icon.png" />
        </CardButton>
        <CardButton
          isSelected={state.publicationType === 2}
          variant="donations"
          onClick={() => setField("publicationType", 2)}
        >
          <span>Donación</span>
          <img alt="donacion" src="/icons/explore-giving-hand-icon.png" />
        </CardButton>
      </Container>

      <Title>Título y descripción</Title>
      <SubTitle>
        Ingresá un título para tu publicación y escribí una descripción
      </SubTitle>
      <Container alignItems="flex-start" flexDirection="column">
        <Input
          borderColor={usePublishDictionary("color", state.publicationType)}
          height="40px"
          onChange={(v) => setField("title", v)}
          placeholder="Titulo de la publicación"
          textAlign="left"
          value={state.title}
          width="350px"
        />
        <Textarea
          borderColor={usePublishDictionary("color", state.publicationType)}
          margin="20px 0 0 0"
          onChange={(v) => setField("description", v)}
          placeholder="Descripción"
          textAlign="left"
          value={state.description}
          width="100%"
        />
      </Container>

      <Title>Imágenes</Title>
      <SubTitle>
        Seleccioná las fotos que querés que se muestren de tu{" "}
        {usePublishDictionary("title", state.publicationType)}
      </SubTitle>
      <span className="disclaimer">Mínimo una, máximo tres*</span>
      <Container>
        <ImageContainer>
          <input type="file" />
          <span>+</span>
        </ImageContainer>
        <ImageContainer>
          <input type="file" />
          <span>+</span>
        </ImageContainer>
        <ImageContainer>
          <input type="file" />
          <span>+</span>
        </ImageContainer>
      </Container>

      <Container justifyContent="flex-end">
        <Button
          disabled={isContinueDisabled}
          onClick={() => setField("currentStep", state.currentStep + 1)}
          variant={
            state.publicationType === undefined
              ? "neutral"
              : state.publicationType === 1
              ? "needs"
              : "donations"
          }
        >
          Siguiente
        </Button>
      </Container>
    </>
  );
}

interface StyleProps {
  alignItems?: string;
  flexDirection?: string;
  isSelected?: boolean;
  justifyContent?: string;
  variant?: string;
}

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin: 10px 0 5px 0;
`;

const SubTitle = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Container = styled.div`
  align-items: ${({ alignItems = "center" }) => alignItems};
  display: flex;
  flex-direction: ${({ flexDirection = "row" }) => flexDirection};
  justify-content: ${({ justifyContent = "space-between" }: StyleProps) =>
    justifyContent};
  margin: 20px 0 50px 0;
  width: 100%;
`;

const CardButton = styled.button`
  align-items: center;
  background: none;
  border-radius: 10px;
  border: 1px solid
    ${({
      isSelected,
      variant, //@ts-ignore
      theme,
    }: StyleProps) =>
      isSelected
        ? variant === "needs"
          ? theme.primary_red
          : theme.primary_green
        : theme.gray};
  box-shadow: ${({ isSelected }: StyleProps) =>
    isSelected
      ? "0px 0px 5px rgba(0, 0, 0, 0.1)"
      : "0px 0px 10px rgba(0, 0, 0, 0.1)"};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  height: 150px;
  outline: none;
  padding: 20px;
  width: 180px;
  > span {
    font-size: 14px;
    font-weight: 600;
  }
  > img {
    width: 110px;
  }
  &:hover {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid
      ${({
        variant, //@ts-ignore
        theme,
      }: StyleProps) =>
        variant === "needs" ? theme.primary_red : theme.primary_green};
  }
`;

const ImageContainer = styled.label`
  border: 2px dashed ${({ theme }) => theme.dark_gray};
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 200px;
  > span {
    color: ${({ theme }) => theme.not_black};
    font-size: 100px;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  > input {
    display: none;
  }
`;
