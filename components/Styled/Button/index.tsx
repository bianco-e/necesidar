import styled from "styled-components";
import globalTheme from "../../../styles/globalTheme";

type SizeProps = {
  font: string;
  height: string;
};

type VariantProps = {
  bg: string;
  border: string;
  color: string;
  hover?: string;
  justify: string;
};

type Sizes = {
  xs: SizeProps;
  sm: SizeProps;
  md: SizeProps;
  lg: SizeProps;
};

type Variants = {
  primary: VariantProps;
  secondary: VariantProps;
  needs: VariantProps;
  donations: VariantProps;
  dropdown: VariantProps;
  black: VariantProps;
  neutral: VariantProps;
};

const SIZES: Sizes = {
  xs: {
    font: "12px",
    height: "25px",
  },
  sm: {
    font: "15px",
    height: "30px",
  },
  md: {
    font: "18px",
    height: "40px",
  },
  lg: {
    font: "22px",
    height: "50px",
  },
};

export const VARIANTS: Variants = {
  primary: {
    bg: globalTheme.primary_red,
    border: `3px solid ${globalTheme.primary_red}`,
    color: globalTheme.white,
    hover: globalTheme.primary_red_light,
    justify: "center",
  },
  secondary: {
    bg: globalTheme.primary_green,
    border: `3px solid ${globalTheme.primary_green}`,
    color: globalTheme.white,
    hover: globalTheme.primary_green_light,
    justify: "center",
  },
  needs: {
    bg: globalTheme.white,
    border: `3px solid ${globalTheme.primary_red}`,
    hover: "rgba(255, 124, 112, 0.05)",
    color: globalTheme.primary_red,
    justify: "center",
  },
  donations: {
    bg: globalTheme.white,
    border: `3px solid ${globalTheme.primary_green}`,
    hover: "rgba(142, 220, 185, 0.05)",
    color: globalTheme.primary_green,
    justify: "center",
  },
  dropdown: {
    bg: "none",
    border: `3px solid ${globalTheme.dark_gray}`,
    color: globalTheme.not_black,
    justify: "space-between",
  },
  neutral: {
    bg: globalTheme.white,
    border: `3px solid ${globalTheme.dark_gray}`,
    hover: globalTheme.gray,
    color: globalTheme.dark_gray,
    justify: "center",
  },
  black: {
    bg: globalTheme.not_black,
    border: `3px solid ${globalTheme.not_black}`,
    hover: "#404040",
    color: globalTheme.not_white,
    justify: "center",
  },
};

interface IProps {
  children: JSX.Element | string;
  disabled?: boolean;
  fWeight?: string;
  margin?: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  size?: keyof typeof SIZES;
  variant?: keyof typeof VARIANTS;
  width?: string;
}

export default function Button({
  children,
  disabled,
  fWeight = "400",
  margin = "0",
  onClick,
  size = "md",
  variant = "primary",
  width = "auto",
}: IProps) {
  return (
    <StyledButton
      disabled={disabled}
      fWeight={fWeight}
      margin={margin}
      onClick={onClick}
      size={size}
      variant={variant}
      width={width}
    >
      {children}
    </StyledButton>
  );
}

interface StyleProps {
  fWeight: string;
  margin: string;
  size: keyof typeof SIZES;
  variant: keyof typeof VARIANTS;
  width: string;
}

const StyledButton = styled.button`
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  padding: 0 20px;
  position: relative;
  transition: all 0.1s ease;
  ${({ fWeight, margin, size, variant, width }: StyleProps) => `
    background: ${VARIANTS[variant].bg};
    border: ${VARIANTS[variant].border};
    color: ${VARIANTS[variant].color};
    font-size: ${SIZES[size].font};
    font-weight: ${fWeight};
    height: ${SIZES[size].height};
    justify-content: ${VARIANTS[variant].justify};
    margin: ${margin};
    width: ${width};
    &:hover {
      background: ${VARIANTS[variant].hover};
    }
  `}
  &:active {
    box-shadow: none;
  }
  &:disabled {
    background: ${({ theme }) => theme.white};
    border: 4px solid ${({ theme }) => theme.gray};
    box-shadow: none;
    color: ${({ theme }) => theme.dark_gray};
    cursor: not-allowed;
  }
`;
