import styled from "styled-components";
import { LARGE_BREAKPOINT, SMALL_BREAKPOINT } from "../../utils/constants";

interface IProps {
  children: JSX.Element;
  title: string;
}

export default function MenuContainer({ children, title }: IProps) {
  return (
    <Container>
      <h1 className="title">{title}</h1>
      {children}
    </Container>
  );
}

const Container = styled.section`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 25px;
  overflow-y: auto;
  width: 740px;
  @media (max-width: ${LARGE_BREAKPOINT}) {
    width: 470px;
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    height: 680px;
    margin-top: 40px;
    width: 100%;
  }
  > h1.title {
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    margin: 0 0 20px 0;
  }
`;
