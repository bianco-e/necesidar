import styled from "styled-components";
import Link from "next/link";

export default function ExploreMainButtons() {
  return (
    <ButtonsContainer>
      <Link href="/donaciones">
        <a>
          <span>Ver donaciones</span>
          <img alt="mano donando" src="/icons/explore-giving-hand-icon.png" />
        </a>
      </Link>
      <Link href="/necesidades">
        <a>
          <span>Ver necesidades</span>
          <img
            alt="mano recibiendo"
            src="/icons/explore-receiving-hand-icon.png"
          />
        </a>
      </Link>
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px auto 50px auto;
  width: ${({ theme }) => theme.desktop_container};
  > a {
    align-items: center;
    background: none;
    border: 1px solid ${({ theme }) => theme.gray};
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 190px;
    padding: 25px;
    transition: all 0.4s ease;
    > span {
      font-size: 36px;
      transition: all 0.4s ease;
    }
    > img {
      width: 130px;
    }
    &:hover {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
      transform: scale(1.02);
      > span {
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;
