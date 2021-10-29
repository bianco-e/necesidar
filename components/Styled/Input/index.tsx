import React from "react";
import styled from "styled-components";

interface IProps {
  borderColor?: string;
  height?: string;
  onChange: (v: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  textAlign?: string;
  value: string;
  width?: string;
}

export default function Input({
  borderColor,
  height = "50px",
  onChange,
  onKeyDown = () => {},
  placeholder,
  textAlign = "center",
  value,
  width = "250px",
}: IProps) {
  return (
    <StyledInput
      borderColor={borderColor}
      height={height}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      textAlign={textAlign}
      value={value}
      width={width}
    />
  );
}

interface StyleProps {
  borderColor?: string;
  height: string;
  textAlign: string;
  width: string;
}

const StyledInput = styled.input`
  border: 3px solid
    ${({
      borderColor,
      //@ts-ignore
      theme,
    }) => borderColor || theme.primary_green};
  border-radius: 10px;
  font-family: "Raleway", sans-serif;
  font-size: 18px;
  height: ${({ height }: StyleProps) => height};
  outline: none;
  padding: 10px 20px;
  text-align: ${({ textAlign }: StyleProps) => textAlign};
  transition: border 0.2s ease;
  width: ${({ width }: StyleProps) => width};
  &:focus {
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.15);
  }
`;
