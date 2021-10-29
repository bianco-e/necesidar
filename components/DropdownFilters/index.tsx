import styled from "styled-components";
import Dropdown from "../Styled/Dropdown";
import { useRouter } from "next/router";

interface IProps {
  variant: "needs" | "donations";
}

export default function DropdownFilters({ variant }: IProps) {
  const { push } = useRouter();

  const TYPE_OPTIONS = [
    { id: "Necesidades", onSelection: () => push("necesidades") },
    { id: "Donaciones", onSelection: () => push("donaciones") },
  ];

  return (
    <Container>
      <Dropdown
        variant={variant}
        options={variant === "needs" ? TYPE_OPTIONS : TYPE_OPTIONS.reverse()}
      />
      <Dropdown
        variant={variant}
        options={[
          { id: "Provincia", onSelection: () => {} },
          { id: "Santa Fe", onSelection: () => {} },
          { id: "Santa Fe", onSelection: () => {} },
          { id: "Santa Fe", onSelection: () => {} },
          { id: "Santa Fe", onSelection: () => {} },
          { id: "Santa Fe", onSelection: () => {} },
          { id: "Santa Fe", onSelection: () => {} },
        ]}
      />
      <Dropdown
        variant={variant}
        options={[
          { id: "Localidad", onSelection: () => {} },
          { id: "Rosario", onSelection: () => {} },
        ]}
      />
      <Dropdown
        variant={variant}
        options={[
          { id: "Barrio", onSelection: () => {} },
          { id: "San Martin", onSelection: () => {} },
        ]}
      />
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  width: ${({ theme }) => theme.desktop_container};
`;
