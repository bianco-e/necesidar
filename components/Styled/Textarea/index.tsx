import React from "react";
import styled from "styled-components";

interface IProps {
  borderColor?: string;
  height?: string;
  margin?: string;
  onChange: (v: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  textAlign?: string;
  value: string;
  width?: string;
}

export default function Textarea({
  borderColor,
  height = "100px",
  margin = "0",
  onChange,
  onKeyDown = () => {},
  placeholder,
  textAlign = "center",
  value,
  width = "250px",
}: IProps) {
  return (
    <StyledTextarea
      borderColor={borderColor}
      height={height}
      margin={margin}
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
  margin: string;
  textAlign: string;
  width: string;
}

const StyledTextarea = styled.textarea`
  border: 3px solid
    ${({
      borderColor,
      //@ts-ignore
      theme,
    }) => borderColor || theme.primary_green};
  border-radius: 10px;
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  height: ${({ height }: StyleProps) => height};
  margin: ${({ margin }: StyleProps) => margin};
  outline: none;
  padding: 10px 20px;
  resize: none;
  text-align: ${({ textAlign }: StyleProps) => textAlign};
  transition: border 0.2s ease;
  width: ${({ width }: StyleProps) => width};
  &:focus {
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.15);
  }
`;
