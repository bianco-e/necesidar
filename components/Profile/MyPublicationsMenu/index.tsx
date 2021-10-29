import styled from "styled-components";
import { PublicationData } from "../../../interfaces";
import MyPublicationCard from "./MyPublicationCard";

interface IProps {
  publications: PublicationData[];
}

export default function MyPublicationsMenu({ publications }: IProps) {
  return (
    <Wrapper>
      {publications.map((publication) => (
        <MyPublicationCard key={publication.id} publication={publication} />
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
