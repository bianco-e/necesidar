import styled from "styled-components";
import { PublicationData } from "../../interfaces";
import Card from "./Card";

interface IProps {
  publicationsData: PublicationData[];
  title?: string;
}

export default function Cards({ publicationsData, title }: IProps) {
  return (
    <>
      {title ? <Title>{title}</Title> : null}
      <CardsContainer>
        {publicationsData.map((p) => (
          <Card key={p.id} data={p} />
        ))}
      </CardsContainer>
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
