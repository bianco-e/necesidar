import styled from "styled-components";
import Image from "next/image";

export default function ShareModalContent() {
  return (
    <Wrapper>
      <h1 className="title">Compartir</h1>
      <div className="buttons-container">
        <ShareButton>
          <span>Copiar link</span>
          <Image
            alt="copiar"
            height={45}
            width={45}
            src="/icons/nd-link-icon-needs.png"
          />
        </ShareButton>
        <ShareButton>
          <span>Enviar por Whatsapp</span>
          <Image
            alt="whatsapp"
            height={35}
            width={35}
            src="/icons/whatsapp-icon.png"
          />
        </ShareButton>
        <ShareButton>
          <span>Publicar en Twitter</span>
          <Image
            alt="twitter"
            height={40}
            width={40}
            src="/icons/twitter-icon.png"
          />
        </ShareButton>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.not_white};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.gray};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  height: 400px;
  justify-content: space-between;
  margin: 0 auto;
  padding: 25px;
  width: 500px;
  > h1.title {
    font-size: 36px;
    margin: 0;
  }
  > div.buttons-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 250px;
    justify-content: space-between;
    width: 100%;
  }
`;

const ShareButton = styled.button`
  align-items: center;
  background: none;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 20px;
  transition: all 0.15s ease;
  width: 100%;
  > span {
    font-size: 18px;
    font-weight: 600;
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.dark_gray};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }
  &:active {
    border: 1px solid ${({ theme }) => theme.dark_gray};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  }
`;
