import styled from "styled-components";
import { PublicationData } from "../../../interfaces";
import NoResults from "../../Styled/NoResults";
import MyPublicationCard from "./MyPublicationCard";

interface IProps {
  forFavorites?: boolean;
  publications?: PublicationData[];
}

export default function MyPublicationsMenu({
  forFavorites = false,
  publications,
}: IProps) {
  return (
    <Wrapper>
      {publications ? (
        publications.length > 0 ? (
          publications.map((publication) => (
            <MyPublicationCard
              key={publication.id}
              forFavorites={forFavorites}
              publication={publication}
            />
          ))
        ) : (
          <NoResults text="No tenes publicaciones" />
        )
      ) : (
        <span>Cargando...</span>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
