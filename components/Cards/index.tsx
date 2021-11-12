import styled from "styled-components";
import { PublicationData } from "../../interfaces";
import { LARGE_BREAKPOINT, SMALL_BREAKPOINT } from "../../utils/constants";
import NoResults from "../Styled/NoResults";
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
            <NoResults text="No existen publicaciones que coincidan" />
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
  @media (max-width: ${LARGE_BREAKPOINT}) {
    width: ${({ theme }) => theme.tablet_container};
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    width: ${({ theme }) => theme.mobile_container};
  }
`;
