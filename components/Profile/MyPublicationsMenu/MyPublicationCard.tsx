import type { PublicationData, SessionUser } from "../../../interfaces";
import { useState } from "react";
import styled from "styled-components";
import { ellipseText } from "../../../utils/helpers";
import { useRouter } from "next/router";
import { handleToggleFavorite } from "../../../queries";

interface IProps {
  forFavorites?: boolean;
  publication: PublicationData;
  user: SessionUser;
}

export default function MyPublicationCard({
  forFavorites,
  publication,
  user,
}: IProps) {
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const { push } = useRouter();

  return (
    <Card
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      showButtons={showButtons}
      views={!forFavorites ? publication.requests_number : undefined}
      onClick={() => push(`/id/${publication.id}`)}
    >
      <div className="buttons-container">
        {!forFavorites ? (
          <>
            <button onClick={(e) => e.stopPropagation()}>
              <img alt="editar" src="/icons/nd-edit-icon.png" />
            </button>
            <button onClick={(e) => e.stopPropagation()}>
              <img alt="eliminar" src="/icons/nd-delete-icon.png" />
            </button>
          </>
        ) : (
          <button
            onClick={(e) =>
              handleToggleFavorite(e, user.user_id!, publication.id)
            }
          >
            <img alt="favorito" src="/icons/singleview-filled-heart-icon.png" />
          </button>
        )}
      </div>
      <img alt={publication.title} src={publication.images[0]} />
      <div className="data-container">
        <h2>{publication.title}</h2>
        <p>{ellipseText(publication.description, 200)}</p>
      </div>
    </Card>
  );
}

interface StyleProps {
  showButtons: boolean;
  views?: number;
}

const Card = styled.div`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.gray};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  height: 140px;
  margin-bottom: 20px;
  padding: 25px;
  position: relative;
  width: 100%;
  > div.buttons-container {
    align-items: center;
    display: ${({ showButtons }: StyleProps) =>
      showButtons ? "flex" : "none"};
    justify-content: flex-end;
    padding: 5px 10px;
    position: absolute;
    right: 0;
    top: 0;
    > button {
      align-items: center;
      background: none;
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.gray};
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      display: flex;
      height: 40px;
      justify-content: center;
      margin-left: 8px;
      outline: none;
      transition: all 0.1s ease;
      width: 40px;
      > img {
        width: 30px;
        height: 30px;
      }
      &:hover {
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
      }
      &:active {
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
      }
    }
  }
  > img {
    border-radius: 10px;
    width: 140px;
    object-fit: cover;
  }
  ${({ views }: StyleProps) =>
    views !== undefined
      ? `&:after {
    bottom: 0;
    content: "Visto ${views} veces";
    font-size: 8px;
    padding: 5px 10px;
    position: absolute;
    right: 0;
  }`
      : ``}

  > div.data-container {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    > h2 {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 5px 0;
    }
    > p {
      font-size: 14px;
      margin: 0;
    }
  }
`;
