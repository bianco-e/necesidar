import type { PublishState } from "./reducer";
import styled from "styled-components";
import Button from "../Styled/Button";
import Dropdown from "../Styled/Dropdown";
import Input from "../Styled/Input";
import { useEffect, useState } from "react";
import usePublishDictionary from "./usePublishDictionary";

interface IProps {
  setField: (field: string, value: any) => void;
  state: PublishState;
}

export default function StepTwo({ setField, state }: IProps) {
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>(true);
  const fieldsForValidation = [
    state.location.province,
    state.location.city,
    state.location.neighborhood,
    state.can_move,
    state.urgency,
    state.email,
    state.phone,
  ];

  useEffect(() => {
    if (
      fieldsForValidation.every((field) => field !== undefined && field !== "")
    ) {
      setIsContinueDisabled(false);
    } else setIsContinueDisabled(true);
  }, [...fieldsForValidation]);

  return (
    <>
      <Title>Ubicación</Title>
      <SubTitle>
        Ingresa la dirección aproximada de donde tenes tu{" "}
        {usePublishDictionary("title", state.publicationType)}
      </SubTitle>
      <Container>
        <div className="sub-container">
          <p>Provincia</p>
          <Dropdown
            variant={state.publicationType === 1 ? "needs" : "donations"}
            options={[
              {
                name: "Provincia",
                onSelection: () =>
                  setField("location", {
                    ...state.location,
                    province: "Santa Fe",
                  }),
              },
            ]}
          />
        </div>
        <div className="sub-container">
          <p>Localidad</p>
          <Dropdown
            variant={state.publicationType === 1 ? "needs" : "donations"}
            options={[
              {
                name: "Localidad",
                onSelection: () =>
                  setField("location", { ...state.location, city: "Rosario" }),
              },
            ]}
          />
        </div>
        <div className="sub-container">
          <p>Barrio</p>
          <Dropdown
            variant={state.publicationType === 1 ? "needs" : "donations"}
            options={[
              {
                name: "Barrio",
                onSelection: () =>
                  setField("location", {
                    ...state.location,
                    neighborhood: "San Martin",
                  }),
              },
            ]}
          />
        </div>
      </Container>

      <Title>Detalles</Title>
      <SubTitle>
        Ingresa los detalles que ayudan a que se concrete el encuentro
      </SubTitle>
      <Container>
        <div className="sub-container">
          <p>Movilidad para facilitar la {"{entrega/busqueda}"}</p>
          <Dropdown
            variant={state.publicationType === 1 ? "needs" : "donations"}
            options={[
              {
                name: "Seleccione",
                onSelection: () => setField("can_move", undefined),
              },
              { name: "Si", onSelection: () => setField("can_move", true) },
              { name: "No", onSelection: () => setField("can_move", false) },
            ]}
          />
        </div>
        <div className="sub-container">
          <p>Nivel de urgencia</p>
          <Dropdown
            variant={state.publicationType === 1 ? "needs" : "donations"}
            options={[
              {
                name: "Seleccione",
                onSelection: () => setField("urgency", undefined),
              },
              { name: "Alto", onSelection: () => setField("urgency", 1) },
              { name: "Medio", onSelection: () => setField("urgency", 2) },
              { name: "Bajo", onSelection: () => setField("urgency", 3) },
            ]}
          />
        </div>
      </Container>

      <Title>Contacto</Title>
      <SubTitle>
        Corrobora que los datos sean los correctos para facilitar el contacto
      </SubTitle>
      <Container>
        <div className="sub-container">
          <p>Email</p>
          <Input
            borderColor={usePublishDictionary("color", state.publicationType)}
            height="40px"
            onChange={(v) => setField("email", v)}
            textAlign="left"
            value={state.email}
            width="240px"
          />
        </div>
        <div className="sub-container">
          <p>Telefono</p>
          <Input
            borderColor={usePublishDictionary("color", state.publicationType)}
            height="40px"
            onChange={(v) => setField("phone", v)}
            textAlign="left"
            value={state.phone}
            width="240px"
          />
        </div>
      </Container>

      <ButtonsContainer>
        <Button
          onClick={() => setField("currentStep", state.currentStep - 1)}
          variant={state.publicationType === 1 ? "needs" : "donations"}
        >
          Anterior
        </Button>
        <Button
          disabled={isContinueDisabled}
          onClick={() => {}}
          variant={state.publicationType === 1 ? "primary" : "secondary"}
        >
          Publicar
        </Button>
      </ButtonsContainer>
    </>
  );
}

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin: 10px 0 5px 0;
`;

const SubTitle = styled.p`
  font-size: 14px;
  margin: 0 0 20px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  width: 100%;
  > div.sub-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
  }
  > p {
    font-size: 16px;
  }
  > span.disclaimer {
    font-size: 10px;
    font-style: italic;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  width: 100%;
`;
