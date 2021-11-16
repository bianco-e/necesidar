import styled from "styled-components";
import Link from "next/link";
import { LARGE_BREAKPOINT, SMALL_BREAKPOINT } from "../../utils/constants";

export default function ExploreMainButtons() {
  return (
    <ButtonsContainer>
      <Link href="/necesidades">
        <a>
          <span>Ver necesidades</span>
          <img
            alt="mano recibiendo"
            src="/icons/explore-receiving-hand-icon.png"
          />
        </a>
      </Link>
      <Link href="/donaciones">
        <a>
          <span>Ver donaciones</span>
          <img alt="mano donando" src="/icons/explore-giving-hand-icon.png" />
        </a>
      </Link>
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto 30px auto;
  width: ${({ theme }) => theme.desktop_container};
  > a {
    align-items: center;
    background: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 180px;
    padding: 25px;
    transition: all 0.4s ease;
    > span {
      font-size: 30px;
      text-align: center;
    }
    > img {
      width: 120px;
    }
    &:hover {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
      transform: scale(1.02);
      > span {
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
      }
    }
    &:active {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      transform: scale(1.02);
      > span {
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }
    }
  }
  @media (max-width: ${LARGE_BREAKPOINT}) {
    width: ${({ theme }) => theme.tablet_container};
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    width: ${({ theme }) => theme.mobile_container};
    > a {
      height: 120px;
      > span {
        font-size: 15px;
      }
      > img {
        width: 80px;
      }
    }
  }
`;
