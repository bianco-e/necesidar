import type { UserSession } from "../../interfaces";
import styled from "styled-components";
import UserContainer from "./UserContainer";
import MenuContainer from "./MenuContainer";

interface IProps {
  session: UserSession;
  children: JSX.Element;
  title: string;
}

export default function Profile({ children, session, title }: IProps) {
  return (
    <Wrapper>
      <UserContainer session={session} />
      <MenuContainer title={title}>{children}</MenuContainer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  width: ${({ theme }) => theme.desktop_container};
`;
