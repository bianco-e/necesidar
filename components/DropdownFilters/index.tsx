import styled from "styled-components";
import Dropdown from "../Styled/Dropdown";
import { useRouter } from "next/router";
import { Geo } from "../../interfaces";

interface IProps {
  variant: "needs" | "donations";
  provinces: Geo[];
}

const parseGeoData = (
  firstElement: { name: string; onSelection: () => void },
  geoData: Geo[]
) => {
  return [firstElement].concat(
    geoData
      .sort((a: Geo, b: Geo) => {
        if (a.nombre < b.nombre) return -1;
        if (a.nombre > b.nombre) return 1;
        return 0;
      })
      .map((p) => ({
        id: p.id,
        name: p.nombre,
        onSelection: () => {},
      }))
  );
};

export default function DropdownFilters({ provinces, variant }: IProps) {
  const { push } = useRouter();

  const TYPE_OPTIONS = [
    { name: "Necesidades", onSelection: () => push("necesidades") },
    { name: "Donaciones", onSelection: () => push("donaciones") },
  ];

  const PROVINCES_OPTIONS = parseGeoData(
    { name: "Provincia", onSelection: () => {} },
    provinces
  );

  return (
    <Container>
      <Dropdown
        variant={variant}
        width="200px"
        options={variant === "needs" ? TYPE_OPTIONS : TYPE_OPTIONS.reverse()}
      />
      <Dropdown
        variant={variant}
        width="200px"
        options={[
          { name: "Categoría", onSelection: () => {} },
          { name: "Tratamiento", onSelection: () => {} },
          { name: "Descartable", onSelection: () => {} },
          { name: "Rehabilitacion", onSelection: () => {} },
          { name: "Accesorio", onSelection: () => {} },
          { name: "Otra", onSelection: () => {} },
        ]}
      />
      <Dropdown variant={variant} width="200px" options={PROVINCES_OPTIONS} />
      <Dropdown
        variant={variant}
        width="200px"
        options={[
          { name: "Localidad", onSelection: () => {} },
          { name: "Rosario", onSelection: () => {} },
        ]}
      />
      <Dropdown
        variant={variant}
        width="200px"
        options={[
          { name: "Barrio", onSelection: () => {} },
          { name: "San Martin", onSelection: () => {} },
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
