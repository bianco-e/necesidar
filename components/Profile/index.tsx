import styled from "styled-components";
import UserContainer from "./UserContainer";
import MenuContainer from "./MenuContainer";

interface IProps {
  children: JSX.Element;
  title: string;
}

export default function Profile({ children, title }: IProps) {
  return (
    <Wrapper>
      <UserContainer />
      <MenuContainer title={title}>{children}</MenuContainer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: ${({ theme }) => theme.desktop_container};
`;
