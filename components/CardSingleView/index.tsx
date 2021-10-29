import { useState } from "react";
import styled from "styled-components";
import { PublicationData } from "../../interfaces";
import { getDaysDifference } from "../../utils/helpers";
import Button from "../Styled/Button";

interface IProps {
  data: PublicationData;
}

export default function CardSingleView({ data }: IProps) {
  const [isInFavs, setIsInFavs] = useState<boolean>(false);
  const daysDiff = getDaysDifference(data.created_at, new Date().getTime());
  return (
    <Card>
      <CardTitle>{data.title}</CardTitle>
      <div className="main-container">
        <div className="pictures-container">
          <img alt={data.title} src={data.images[0]} />
        </div>
        <DataContainer>
          <div className="features-container">
            <ul>
              <li className={data.can_move ? "" : "overline"}>
                <img alt="movilidad" src="/icons/card-car-icon.png" />
                <span>
                  {data.can_move ? "Tiene movilidad" : "No tiene movilidad"}
                </span>
              </li>
              <li>
                <img alt="ubicacion" src="/icons/card-location-icon.png" />
                <span>
                  {data.location.city}, {data.location.province}
                </span>
              </li>
              <li>
                <img alt="calendario" src="/icons/card-calendar-icon.png" />
                <span>
                  {daysDiff < 1
                    ? "Publicado hoy"
                    : `Publicado hace ${daysDiff} ${
                        daysDiff === 1 ? "día" : "días"
                      }`}
                </span>
              </li>
              <li className="user-data">
                <img
                  alt={data.user_id}
                  src="https://definicionde.es/wp-content/uploads/2019/04/definicion-de-persona-min.jpg"
                />
                <p>Jorgelina Perez Desantis</p>
              </li>
            </ul>

            <div className="favshare-buttons-container">
              <button>
                <img alt="compartir" src="/icons/singleview-share-icon.png" />
              </button>
              <button onClick={() => setIsInFavs(!isInFavs)}>
                <img
                  alt="favoritos"
                  src={`/icons/singleview${
                    isInFavs ? "-filled" : ""
                  }-heart-icon.png`}
                />
              </button>
            </div>
          </div>

          <div className="buttons-container">
            <Button variant="needs" onClick={() => {}}>
              Contactar por E-mail
            </Button>
            <Button variant="donations" onClick={() => {}}>
              Contactar por WhatsApp
            </Button>
          </div>
        </DataContainer>
      </div>

      <div className="description">
        <h3>Descripción</h3>
        <p>{data.description}</p>
      </div>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  min-height: 55vh;
  width: ${({ theme }) => theme.desktop_container};
  > div.main-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    > div.pictures-container {
      > img {
        border-radius: 10px;
        height: 440px;
        width: 650px;
      }
    }
  }
  > div.description {
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.gray};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    padding: 25px;
    font-size: 14px;
    > h3 {
      font-weight: 600;
      margin-top: 0;
    }
    > p {
      margin-bottom: 0;
    }
  }
`;

const DataContainer = styled.section`
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 440px;
  justify-content: space-between;
  padding: 25px;
  width: 455px;
  > div.features-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    > div.favshare-buttons-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-around;
      > button {
        align-items: center;
        background: none;
        border: 0;
        cursor: pointer;
        display: flex;
        justify-content: center;
        padding: 0;
        > img {
          height: 60px;
          width: 60px;
        }
      }
    }
    > ul {
      font-size: 14px;
      list-style-type: none;
      padding: 0;
      > li {
        align-items: center;
        display: flex;
        position: relative;
        > img {
          height: 40px;
          margin-right: 5px;
          width: 40px;
        }
      }
      > li.overline {
        &:after {
          background: red;
          content: "";
          height: 2px;
          position: absolute;
          transform: rotate(135deg);
          width: 40px;
        }
      }
      > li.user-data {
        font-size: 14px;
        > p {
          font-weight: 600;
        }
        > img {
          border-radius: 50%;
          margin: 5px 5px 0 5px;
          object-fit: cover;
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  > div.buttons-container {
    display: flex;
    flex-direction: column;
    > button {
      margin-top: 15px;
    }
  }
`;

const CardTitle = styled.h1`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.gray};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  font-size: 26px;
  font-weight: 600;
  margin: 0 0 10px 0;
  padding: 20px;
  width: 100%;
`;
