import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styled from "styled-components";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { UserSession } from "../../../interfaces";
import { ellipseText } from "../../../utils/helpers";

interface IProps {
  session: UserSession;
  signOut: (options: { callbackUrl: string }) => void;
}

export default function UserDropdownMenu({ session, signOut }: IProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const router = useRouter();
  const username = ellipseText(session.user.name.split(" ")[0], 10);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, setShowDropdown, showDropdown);

  return (
    <MenuContainer onClick={() => setShowDropdown(!showDropdown)}>
      <p>
        <span>
          Hola <b>{username}</b>
        </span>
      </p>
      <Avatar alt={session.user.name} src={session.user.image} />
      {showDropdown ? (
        <DropdownContainer ref={dropdownRef}>
          <DropdownButton onClick={() => router.push("/publicar")}>
            Publicar
          </DropdownButton>
          <DropdownButton onClick={() => router.push("/perfil")}>
            Perfil
          </DropdownButton>
          <DropdownButton
            onClick={() => signOut({ callbackUrl: `${window.origin}/explore` })}
          >
            Cerrar sesion
          </DropdownButton>
        </DropdownContainer>
      ) : null}
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  align-items: center;
  background: none;
  border: 0;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  margin-left: 40px;
  position: relative;
  > p {
    border-radius: 10px 0 0 10px;
    border: 2px solid ${({ theme }) => theme.primary_red};
    border-right: 0;
    height: 40px;
    display: flex;
    align-items: center;
    margin: 0;
    margin-right: -12px;
    padding: 5px 15px;
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 44px;
  object-fit: cover;
  width: 44px;
`;

const DropdownContainer = styled.div`
  background: ${({ theme }) => theme.white};
  border: 2px solid ${({ theme }) => theme.primary_red};
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 110%;
  width: 100%;
  align-items: center;
`;

const DropdownButton = styled.button`
  background: none;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.primary_red};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  height: 40px;
  width: 100%;
  &:last-child {
    border-bottom: 0;
    border-radius: 0 0 10px 10px;
  }
  &:hover {
    background: ${({ theme }) => theme.not_white};
  }
`;
