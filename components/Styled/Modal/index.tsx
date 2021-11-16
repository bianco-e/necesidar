import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

interface IProps {
  children: JSX.Element;
  closeModal?: () => void;
  isOpen: boolean;
}

export default function Modal({ closeModal, children, isOpen }: IProps) {
  const modalContainer = process.browser
    ? document.getElementById("__next")
    : null;
  return modalContainer && isOpen
    ? ReactDOM.createPortal(
        <ModalWrapper>
          <ModalContainer>
            {closeModal ? <button onClick={closeModal}>X</button> : null}
            {children}
          </ModalContainer>
        </ModalWrapper>,
        modalContainer
      )
    : null;
}

const showingAnimation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const fallingAnimation = keyframes`
0% {
    transform: translateY(-1200px);
}
100% {
    transform: translateY(0);
}
`;

const ModalWrapper = styled.div`
  align-items: center;
  animation: 0.3s ${showingAnimation} linear;
  background: ${({ theme }) => theme.transparent};
  display: flex;
  height: 100vh;
  justify- content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const ModalContainer = styled.div`
  animation: 0.3s ${fallingAnimation} forwards;
  background: ${({ theme }) => theme.not_white};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.gray};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  margin: auto;
  padding: 25px;
  position: relative;
  > button {
    background: none;
    border: 0;
    color: ${({ theme }) => theme.dark_gray};
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    top: 20px;
    right: 20px;
    &:hover {
      color: ${({ theme }) => theme.warning_red};
    }
  }
`;
