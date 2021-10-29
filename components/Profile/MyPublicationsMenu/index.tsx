import styled from "styled-components";
import { PublicationData } from "../../../interfaces";
import MyPublicationCard from "./MyPublicationCard";

interface IProps {
  forFavorites?: boolean;
  publications: PublicationData[];
}

export default function MyPublicationsMenu({
  forFavorites = false,
  publications,
}: IProps) {
  return (
    <Wrapper>
      {publications.map((publication) => (
        <MyPublicationCard
          key={publication.id}
          forFavorites={forFavorites}
          publication={publication}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
