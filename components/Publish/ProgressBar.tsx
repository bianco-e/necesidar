import styled from "styled-components";

interface IProps {
  currentStep: number;
  fillColor: string;
  totalSteps: number;
}

export default function ProgressBar({
  fillColor,
  currentStep,
  totalSteps,
}: IProps) {
  return (
    <BarContainer content={`${currentStep + 1} de ${totalSteps}`}>
      <Bar
        fillColor={fillColor}
        width={`${100 / (totalSteps / (currentStep + 1))}%`}
      />
    </BarContainer>
  );
}

interface StyleProps {
  content?: string;
  fillColor?: string;
  width?: string;
}

const BarContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.dark_gray};
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  width: 50%;
  height: 10px;
  margin: 0 auto;
  position: relative;
  &:after {
    content: "${({ content }: StyleProps) => content}";
    width: 60px;
    text-align: center;
    position: absolute;
    top: 100%;
    margin-top: 5px;
    left: calc(50% - 30px);
    font-size: 12px;
  }
`;

const Bar = styled.div`
  background: ${({ fillColor }: StyleProps) => fillColor};
  border-radius: 10px;
  height: 100%;
  transition: background 0.2s ease, width 0.8s ease;
  width: ${({ width }: StyleProps) => width};
`;
