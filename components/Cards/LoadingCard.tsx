import styled, { keyframes } from "styled-components";
import { CardContainer } from "./Card";

export default function LoadingCard() {
  return (
    <LoadingCardContainer>
      <LoadingActivity />
      <div className="loading-image" />
      <div className="loading-title" />
      <div className="loading-description-line" />
      <div className="loading-description-line" />
      <ul className="loading-list">
        <li>
          <div className="loading-list-item" />
        </li>
        <li>
          <div className="loading-list-item" />
        </li>
        <li>
          <div className="loading-list-item" />
        </li>
      </ul>
      <div className="user-data">
        <div className="loading-user-name" />
        <div className="loading-user-avatar" />
      </div>
    </LoadingCardContainer>
  );
}

const loadingAnimation = keyframes`
    0%{
        left: -50%;
        top: -150%;
    }
    100%{
        left: 100%;
        top: 100%;
    }
`;

const LoadingCardContainer = styled(CardContainer)`
  overflow: hidden;
  position: relative;
  > .loading-image,
  .loading-title,
  .loading-description-line,
  .loading-list-item,
  .loading-user-name,
  .loading-user-avatar {
    background: rgb(255, 141, 129);
    background: linear-gradient(
      130deg,
      rgba(255, 141, 129, 1) 0%,
      rgba(159, 237, 201, 1) 100%
    );
    border-radius: 10px;
  }
  > .loading-image {
    height: 160px;
    width: 100%;
  }
  > .loading-title {
    height: 30px;
    width: 70%;
    margin: 15px 0;
  }
  > .loading-description-line,
  .loading-list-item {
    height: 15px;
    width: 95%;
    margin: 5px 0;
  }
  > ul .loading-list-item {
    &:first-child {
      margin-top: 10px;
    }
    width: 75%;
  }
  > div.user-data .loading-user-name {
    height: 20px;
    width: 180px;
    margin: 5px 0;
  }
  > div.user-data .loading-user-avatar {
    border-radius: 50%;
    margin-left: 10px;
    width: 35px;
    height: 35px;
  }
`;

const LoadingActivity = styled.div`
  animation: ${loadingAnimation} 1.2s infinite;
  height: 200%;
  left: -50%;
  position: absolute;
  top: -150%;
  transform: rotate(45deg);
  width: 30%;
  background-image: linear-gradient(
    to left,
    rgba(251, 251, 251, 0.05),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.6),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.05)
  );
  background-image: -moz-linear-gradient(
    to left,
    rgba(251, 251, 251, 0.05),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.6),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.05)
  );
  background-image: -webkit-linear-gradient(
    to left,
    rgba(251, 251, 251, 0.05),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.6),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.05)
  );
`;
