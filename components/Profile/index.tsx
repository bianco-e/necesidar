import type { Session } from "../../interfaces";
import styled from "styled-components";
import UserContainer from "./UserContainer";
import MenuContainer from "./MenuContainer";
import { LARGE_BREAKPOINT, SMALL_BREAKPOINT } from "../../utils/constants";

interface IProps {
  session: Session;
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
  @media (max-width: ${LARGE_BREAKPOINT}) {
    width: ${({ theme }) => theme.tablet_container};
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    width: ${({ theme }) => theme.mobile_container};
  }
`;
