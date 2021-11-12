import type { SessionUser } from "../../interfaces";
import styled from "styled-components";
import Button from "../Styled/Button";
import { useRouter } from "next/router";

interface IProps {
  user: SessionUser;
}

export default function UserContainer({ user }: IProps) {
  const { push } = useRouter();

  return (
    <Wrapper>
      <Container>
        <img alt={user.first_name} className="user-avatar" src={user.image} />
        <h3 className="user-name">
          {user.first_name} {user.last_name}
        </h3>
        <p className="user-email">{user.email}</p>
      </Container>

      <Button
        onClick={() => push("/publicar")}
        variant="secondary"
        width="100%"
      >
        Publicar
      </Button>

      <Container>
        <Button onClick={() => push("/perfil/mis-favoritos")} variant="primary">
          Mis favoritos
        </Button>
        <Button
          onClick={() => push("/perfil/mis-donaciones")}
          variant="donations"
        >
          Mis donaciones
        </Button>
        <Button onClick={() => push("/perfil/mis-necesidades")} variant="needs">
          Mis necesidades
        </Button>
        <Button variant="black" onClick={() => push("/perfil")}>
          Configuración
        </Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  align-items: center;
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 660px;
  padding: 25px;
  width: 330px;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  > img.user-avatar {
    border-radius: 50%;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    width: 180px;
    height: 180px;
    object-fit: cover;
  }
  > h3.user-name {
    font-weight: 600;
    margin-bottom: 5px;
  }
  > p.user-email {
    font-size: 13px;
    margin: 0;
  }
  > button {
    margin-bottom: 20px;
    width: 100%;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
