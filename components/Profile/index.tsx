import type { SessionUser } from "../../interfaces";
import styled from "styled-components";
import UserContainer from "./UserContainer";
import MenuContainer from "./MenuContainer";
import { LARGE_BREAKPOINT, SMALL_BREAKPOINT } from "../../utils/constants";

interface IProps {
  user: SessionUser;
  children: JSX.Element;
  title: string;
}

export default function Profile({ children, user, title }: IProps) {
  return (
    <Wrapper>
      <UserContainer user={user} />
      <MenuContainer title={title}>{children}</MenuContainer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  align-items: center;
  display: flex;
  height: 660px;
  justify-content: space-between;
  margin-bottom: 40px;
  width: ${({ theme }) => theme.desktop_container};
  @media (max-width: ${LARGE_BREAKPOINT}) {
    width: ${({ theme }) => theme.tablet_container};
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    flex-direction: column;
    height: auto;
    width: ${({ theme }) => theme.mobile_container};
  }
`;
