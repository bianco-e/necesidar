import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Styled/Input";
import globalTheme from "../../styles/globalTheme";
import { checkKeyDown } from "../../utils/helpers";
import { useRouter } from "next/router";

interface IProps {
  onEnterDown?: (v: string) => void;
  valueSetter: (s: string) => void;
  value: string;
  variant?: "default" | "donations" | "needs";
}

const VARIANTS = {
  default: {
    borderColor: globalTheme.primary_green,
    push: "/donaciones?search=",
    placeholder: "Ej: Silla de ruedas",
    title: "Buscá lo que necesites",
    width: "520px",
  },
  donations: {
    borderColor: globalTheme.primary_green,
    push: "/donaciones?search=",
    placeholder: "Buscá en Donaciones",
    title: "Donaciones",
    width: "450px",
  },
  needs: {
    borderColor: globalTheme.primary_red,
    push: "/necesidades?search=",
    placeholder: "Buscá en Necesidades",
    title: "Necesidades",
    width: "450px",
  },
};

export default function MainInput({
  onEnterDown,
  valueSetter,
  value,
  variant = "default",
}: IProps) {
  const { push } = useRouter();

  return (
    <Container>
      <h1>{VARIANTS[variant].title}</h1>
      <Input
        borderColor={VARIANTS[variant].borderColor}
        onChange={(v) => valueSetter(v)}
        onKeyDown={(e: React.KeyboardEvent) =>
          checkKeyDown(e, "Enter", () => {
            const target = e.target as HTMLInputElement;
            onEnterDown
              ? onEnterDown(target.value)
              : push(`${VARIANTS[variant].push}${target.value}`);
          })
        }
        placeholder={VARIANTS[variant].placeholder}
        value={value}
        width={VARIANTS[variant].width}
      />
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  > h1 {
    font-size: 48px;
    font-weight: 600;
    margin: 0 0 20px 0;
  }
`;
