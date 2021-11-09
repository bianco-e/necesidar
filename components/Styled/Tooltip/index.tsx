import styled, { css, keyframes } from "styled-components";

interface IProps {
  content: string;
  variant?: "needs" | "donations";
  withAnimation?: boolean;
}

export default function Tooltip({
  content,
  variant = "needs",
  withAnimation = false,
}: IProps) {
  return (
    <TooltipContainer
      animation={withAnimation && showingAnimation}
      variant={variant}
    >
      <span>{content}</span>
    </TooltipContainer>
  );
}

interface TooltipContainerProps {
  animation?: any;
  variant: "needs" | "donations";
}

const animationKeyframes = keyframes`
    0% {
        transform: scale(1.07);
    }
    20% {
        transform: scale(1.15);
    }
    40% {
        transform: scale(1.07);
    }
    60% {
        transform: scale(1.15);
    }
    80% {
        transform: scale(1.07);
    }
    90% {
        transform: scale(1.02);
    }
    100% {
        transform: scale(1);
    }
`;

const showingAnimation = css`
  animation: 1.5s ${animationKeyframes} ease-out;
`;

const TooltipContainer = styled.div`
  ${({ animation }: TooltipContainerProps) => animation};
  align-items: center;
  background: ${({
    variant,
    //@ts-ignore
    theme,
  }: TooltipContainerProps) =>
    variant === "needs" ? theme.primary_red : theme.primary_green};
  border-radius: 10px;
  bottom: 35px;
  color: ${({ theme }) => theme.white};
  display: flex;
  font-weight: bold;
  height: 30px;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 120px;
  z-index: 20;
  &:after {
    background: ${({
      variant,
      //@ts-ignore
      theme,
    }: TooltipContainerProps) =>
      variant === "needs" ? theme.primary_red : theme.primary_green};
    border-radius: 1px;
    bottom: -3px;
    content: "";
    height: 8px;
    left: 12px;
    position: absolute;
    transform: rotate(45deg);
    width: 8px;
  }
`;
