import styled from "styled-components";
import { PublicationData } from "../../interfaces";
import Card from "./Card";
import LoadingCard from "./LoadingCard";

interface IProps {
  publicationsData?: PublicationData[];
  title?: string;
}

export default function Cards({ publicationsData, title }: IProps) {
  return (
    <>
      {title ? <Title>{title}</Title> : null}
      {publicationsData ? (
        <CardsContainer>
          {publicationsData.length > 0 ? (
            publicationsData.map((p) => <Card key={p.id} data={p} />)
          ) : (
            <div className="no-results-container">
              <span className="no-publications-msg">
                No existen publicaciones que coincidan
              </span>
              <img alt="manos vacias" src="/images/empty-hands-image.png" />
            </div>
          )}
        </CardsContainer>
      ) : (
        <CardsContainer>
          {new Array(6).fill("").map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </CardsContainer>
      )}
    </>
  );
}

const Title = styled.h1`
  font-size: 44px;
  font-weight: 600;
  margin: 0 0 50px 0;
`;
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  margin: 0 auto 50px auto;
  width: ${({ theme }) => theme.desktop_container};
  > div.no-results-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    > img {
      height: 230px;
      width: 350px;
      object-fit: cover;
    }
    > .no-publications-msg {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;
