import styled from "styled-components";
import Image from "next/image";

interface IProps {
  text: string;
}

export default function NoResults({ text }: IProps) {
  return (
    <NoResultsContainer>
      <span className="message">{text}</span>
      <Image
        alt="manos vacias"
        height={230}
        width={350}
        objectFit="cover"
        src="/images/empty-hands-image.png"
      />
    </NoResultsContainer>
  );
}

const NoResultsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  > .message {
    font-size: 18px;
    font-weight: 600;
  }
`;
