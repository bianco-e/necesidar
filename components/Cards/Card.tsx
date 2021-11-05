import styled from "styled-components";
import { PublicationData } from "../../interfaces";
import { ellipseText, getDaysDifference } from "../../utils/helpers";
import { useRouter } from "next/router";

interface IProps {
  data: PublicationData;
}

export default function Card({ data }: IProps) {
  const daysDiff = getDaysDifference(data.created_at, new Date().getTime()); // Math.round(Math.random() * 20);
  const { push } = useRouter();

  return (
    <CardContainer onClick={() => push(`/id/${data.id}`)}>
      <CardImage isUrgent={data.is_urgent}>
        <img alt={data.title} src={data.images[0]} />
      </CardImage>
      <h3 title={data.title}>{ellipseText(data.title, 27)}</h3>
      <p>{ellipseText(data.description, 85)}</p>
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
              : `Publicado hace ${daysDiff} ${daysDiff === 1 ? "día" : "días"}`}
          </span>
        </li>
      </ul>
      <div className="user-data">
        <span>
          {data.user_first_name}, {data.user_last_name}
        </span>
        <img alt={data.user_first_name} src={data.user_avatar} />
      </div>
    </CardContainer>
  );
}

interface StyleProps {
  isUrgent?: boolean;
}

export const CardContainer = styled.div`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.not_white};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 430px;
  padding: 25px;
  width: calc(33% - 20px);
  transition: all 0.2s ease;
  > h3 {
    font-weight: 600;
  }
  > p {
    font-size: 14px;
    margin: 0 0 5px 0;
    height: 37px;
    overflow: hidden;
  }
  > ul {
    font-size: 12px;
    list-style-type: none;
    margin: 5px 0;
    padding: 0;
    > li {
      align-items: center;
      display: flex;
      position: relative;
      > img {
        height: 25px;
        margin-right: 5px;
        width: 25px;
      }
    }
    > li.overline {
      &:after {
        background: red;
        content: "";
        height: 2px;
        position: absolute;
        transform: rotate(135deg);
        width: 25px;
      }
    }
  }
  > div.user-data {
    align-items: center;
    align-self: flex-end;
    display: flex;
    font-size: 14px;
    > img {
      border-radius: 50%;
      margin-left: 10px;
      object-fit: cover;
      width: 35px;
      height: 35px;
    }
  }
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    transform: scale(1.005);
  }
`;

const CardImage = styled.div`
  border-radius: 10px;
  height: 160px;
  position: relative;
  width: 100%;
  > img {
    border-radius: 10px;
    height: 160px;
    object-fit: cover;
    width: 100%;
  }
  ${({
    isUrgent,
    //@ts-ignore
    theme,
  }: StyleProps) =>
    isUrgent
      ? `
  &:after {
    background: ${theme.primary_red};
    border-radius: 10px 0 0 10px;
    color: ${theme.white};
    content: 'Urgente';
    font-size: 14px;
    font-weight: 600;
    padding: 5px 10px;
    position: absolute;
    right: 0;
    top: 10px;
  }`
      : ""}
`;
