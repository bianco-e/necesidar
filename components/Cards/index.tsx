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
            <span>No existen publicaciones que coincidan</span>
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
`;
