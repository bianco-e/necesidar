import { useState } from "react";
import styled from "styled-components";
import { PublicationData } from "../../interfaces";
import { LARGE_BREAKPOINT, SMALL_BREAKPOINT } from "../../utils/constants";
import { ellipseText, getDaysDifference } from "../../utils/helpers";
import ImagesSlider from "../ImagesSlider";
import ShareModalContent from "../ShareModalContent";
import Button from "../Styled/Button";
import Modal from "../Styled/Modal";

interface IProps {
  data: PublicationData;
}

export default function CardSingleView({ data }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isInFavs, setIsInFavs] = useState<boolean>(false);
  const daysDiff = getDaysDifference(data.created_at, new Date().getTime());

  const handleFavorite = () => {
    setIsInFavs(!isInFavs);
  };

  return (
    <>
      <Card>
        <CardHeader
          content={data.publication_type === 0 ? "Necesidad" : "Donación"}
        >
          <div className="container">
            <Title>{data.title}</Title>
            <FavShareButtonsContainer className="fav-share-container">
              <button onClick={() => setIsModalOpen(true)}>
                <img alt="compartir" src="/icons/singleview-share-icon.png" />
              </button>
              <button onClick={handleFavorite}>
                <img
                  alt="favoritos"
                  src={`/icons/singleview${
                    isInFavs ? "-filled" : ""
                  }-heart-icon.png`}
                />
              </button>
            </FavShareButtonsContainer>
          </div>
          <ResponsiveDataContainer>
            <div className="features">
              <div className={data.can_move ? "" : "overline"}>
                <img alt="movilidad" src="/icons/card-car-icon.png" />
                <span>
                  {data.can_move ? "Tiene movilidad" : "No tiene movilidad"}
                </span>
              </div>
              <div>
                <img alt="ubicacion" src="/icons/card-location-icon.png" />
                <span>
                  {data.city}, {data.province}
                </span>
              </div>
              <div>
                <img alt="calendario" src="/icons/card-calendar-icon.png" />
                <span>
                  {daysDiff < 1
                    ? "Publicado hoy"
                    : `Publicado hace ${daysDiff} ${
                        daysDiff === 1 ? "día" : "días"
                      }`}
                </span>
              </div>
            </div>
            <div className="user-data">
              <p>
                {ellipseText(
                  `${data.user_first_name} ${data.user_last_name}`,
                  24
                )}
              </p>
              <img alt={data.user_first_name} src={data.user_image} />
            </div>
          </ResponsiveDataContainer>
        </CardHeader>
        <div className="main-container">
          <div className="pictures-container">
            <ImagesSlider
              slides={data.images.map((image, idx) => ({
                image,
                alt: `${data.title}-${idx}`,
              }))}
              variant={data.publication_type === 0 ? "needs" : "donations"}
            />
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
                    {data.city}, {data.province}
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
                  <img alt={data.user_first_name} src={data.user_image} />
                  <p>
                    {data.user_first_name}, {data.user_last_name}
                  </p>
                </li>
              </ul>

              <FavShareButtonsContainer className="fav-share-container">
                <button onClick={() => setIsModalOpen(true)}>
                  <img alt="compartir" src="/icons/singleview-share-icon.png" />
                </button>
                <button onClick={handleFavorite}>
                  <img
                    alt="favoritos"
                    src={`/icons/singleview${
                      isInFavs ? "-filled" : ""
                    }-heart-icon.png`}
                  />
                </button>
              </FavShareButtonsContainer>
            </div>

            <div className="buttons-container">
              <Button variant="needs" onClick={() => {}}>
                Enviar E-mail
              </Button>
              <Button variant="donations" onClick={() => {}}>
                Enviar WhatsApp
              </Button>
            </div>
          </DataContainer>
        </div>

        <div className="description">
          <h3>Descripción</h3>
          <p>{data.description}</p>
        </div>

        <div className="buttons-container">
          <Button variant="needs" onClick={() => {}}>
            Enviar E-mail
          </Button>
          <Button variant="donations" onClick={() => {}}>
            Enviar WhatsApp
          </Button>
        </div>
      </Card>

      <Modal closeModal={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <ShareModalContent />
      </Modal>
    </>
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
    height: 440px;
    justify-content: space-between;
    width: 100%;
    > div.pictures-container {
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.gray};
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
      height: 100%;
      overflow: hidden;
      width: 650px;
    }
  }
  > div.description {
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.gray};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    padding: 20px;
    font-size: 14px;
    > h3 {
      font-weight: 600;
      margin-top: 0;
    }
    > p {
      margin-bottom: 0;
    }
  }
  > div.buttons-container {
    display: none;
  }
  @media (max-width: ${LARGE_BREAKPOINT}) {
    width: ${({ theme }) => theme.tablet_container};
    > div.main-container {
      height: 400px;
      > div.pictures-container {
        width: 470px;
      }
    }
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    width: ${({ theme }) => theme.mobile_container};
    > div.description {
      padding: 15px;
    }
    > div.buttons-container {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      > button {
        font-size: 14px;
        width: 49%;
      }
    }
  }
`;

const DataContainer = styled.section`
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 20px;
  width: 455px;
  > div.features-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
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
  @media (max-width: ${LARGE_BREAKPOINT}) {
    width: 240px;
    > div.features-container {
      flex-direction: column-reverse;
      > ul {
        font-size: 12px;
        width: 100%;
        > li > img {
          height: 30px;
          width: 30px;
        }
      }
    }
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    display: none;
  }
`;

const ResponsiveDataContainer = styled.section`
  display: none;
  @media (max-width: ${SMALL_BREAKPOINT}) {
    display: flex;
    height: 60px;
    justify-content; space-between;
    margin-top: 10px;
    width: 100%;
    > div.features {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
      width: 165px;
      > div {
        align-items: center;
        display: flex;
        font-size: 11px;
        > img {
        height: 20px;
        width: 20px;
        }
      }
      > div.overline {
        &:after {
          background: red;
          content: "";
          height: 2px;
          position: absolute;
          transform: rotate(135deg);
          width: 20px;
        }
      }
    }
    > div.user-data {
      align-items: center;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-around;
      width: 140px;
      > p {
        font-size: 12px;
        font-weight: 600;
        margin: 0;
        text-align: center;
      }
      > img {
        border-radius: 50%;
        height: 30px;
        object-fit: cover;
        width: 30px;
      }
    }
  }
`;

const FavShareButtonsContainer = styled.div`
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
  @media (max-width: ${LARGE_BREAKPOINT}) {
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100%;
    > button > img {
      height: 50px;
      width: 50px;
    }
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.gray};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 10px;
    width: 90px;
    > button > img {
      height: 35px;
      width: 35px;
    }
  }
`;

interface CardHeaderStyleProps {
  content: string;
}

const CardHeader = styled.section`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.gray};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 0;
  padding: 50px 20px 20px  20px;
  position: relative;
  width: 100%;
  &:after {
    content: ${({ content }: CardHeaderStyleProps) => `"${content}";`}
    color: ${({ theme }) => theme.primary_green};
    font-size: 16px;
    font-weight: 600;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  > div.container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    > .fav-share-container {
      display: none;
    }
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    padding: 30px 15px 15px 15px;
    > div.container { 
      > .fav-share-container {
        display: flex;
      }
    }
    &:after {
      left: 15px;
    }
  }
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
  @media (max-width: ${LARGE_BREAKPOINT}) {
    font-size: 22px;
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    font-size: 16px;
  }
`;
