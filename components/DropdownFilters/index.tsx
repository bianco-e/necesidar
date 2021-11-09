import type { Geo } from "../../interfaces";
import type { PublicationsFilters } from "../../interfaces";
import styled from "styled-components";
import Dropdown from "../Styled/Dropdown";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { capitalizeString, querifyObject } from "../../utils/helpers";
import Button from "../Styled/Button";
import Tooltip from "../Styled/Tooltip";

interface IProps {
  variant: "needs" | "donations";
  provinces: Geo[];
  resetState: () => void;
  setField: (p: string, v?: string) => void;
  state: PublicationsFilters;
}

const CATEGORIES = [
  { name: "Accesorio", id: "1" },
  { name: "Descartable", id: "2" },
  { name: "Rehabilitacion", id: "3" },
  { name: "Tratamiento", id: "4" },
  { name: "Otra", id: "5" },
];

const fetchCities = (setter: (data: Geo[]) => void, id: string) => {
  const route = `https://apis.datos.gob.ar/georef/api/localidades?provincia=${id}&campos=id,nombre&max=350`;
  fetch(route)
    .then((res) => res.json())
    .then((res) => {
      if (res)
        return setter(
          res.localidades.map((l: Geo) => ({
            ...l,
            nombre: capitalizeString(l.nombre),
          }))
        );
      return setter([]);
    });
};

const parseGeoData = (
  firstElement: { name: string; onSelection: () => void },
  geoData: Geo[],
  callback: (n: string, id: string) => void
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
        onSelection: () => {
          callback(p.nombre, p.id);
        },
      }))
  );
};

export default function DropdownFilters({
  provinces,
  resetState,
  setField,
  state,
  variant,
}: IProps) {
  const [showCopiedTooltip, setShowCopiedTooltip] = useState<boolean>(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>();
  const [cities, setCities] = useState<Geo[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (showCopiedTooltip) {
      setTimeout(() => setShowCopiedTooltip(false), 2100);
    }
  }, [showCopiedTooltip]);

  useEffect(() => {
    if (!state.province && !selectedProvinceId) return setField("city", "");
    if (state.province && !selectedProvinceId) {
      const currentProvince = provinces.find(
        (p) => p.nombre === state.province
      );
      if (currentProvince) return setSelectedProvinceId(currentProvince.id);
    }
  }, [state.province, selectedProvinceId]);

  useEffect(() => {
    if (selectedProvinceId !== undefined) {
      fetchCities(setCities, selectedProvinceId);
    } else {
      setField("city", undefined);
      setCities([]);
    }
  }, [selectedProvinceId]);

  const TYPE_OPTIONS = [
    {
      name: "Necesidades",
      onSelection: () =>
        router.push({
          pathname: "/necesidades",
          query: router.query,
        }),
    },
    {
      name: "Donaciones",
      onSelection: () =>
        router.push({
          pathname: "/donaciones",
          query: router.query,
        }),
    },
  ];

  const PROVINCES_OPTIONS = parseGeoData(
    {
      name: "Provincia",
      onSelection: () => {
        setField("province", "");
        setSelectedProvinceId(undefined);
      },
    },
    provinces,
    (n, id) => {
      setField("province", n);
      setSelectedProvinceId(id);
    }
  );

  const handleCopyUrl = () => {
    if (process.browser) {
      const currentUrl = `${window.origin}${router.asPath}`;
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => setShowCopiedTooltip(true))
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <Container>
        <Dropdown
          variant={variant}
          width="230px"
          options={variant === "needs" ? TYPE_OPTIONS : TYPE_OPTIONS.reverse()}
        />
        <Dropdown
          initialValue={state.category}
          variant={variant}
          width="230px"
          options={[
            {
              name: "Categoría",
              onSelection: () => setField("category", ""),
            },
          ].concat(
            CATEGORIES.map((c) => ({
              ...c,
              onSelection: () => setField("category", c.name),
            }))
          )}
        />
        <Dropdown
          initialValue={state.province}
          variant={variant}
          width="230px"
          options={PROVINCES_OPTIONS}
        />
        <Dropdown
          disabled={cities.length < 1}
          initialValue={state.city}
          variant={variant}
          width="230px"
          options={parseGeoData(
            {
              name: "Localidad",
              onSelection: () => setField("city", ""),
            },
            cities,
            (n) => setField("city", n)
          )}
        />
      </Container>
      <Container>
        <Button onClick={handleCopyUrl} size="sm" variant={variant}>
          <>
            {showCopiedTooltip ? (
              <Tooltip
                content="¡Copiado!"
                variant={variant}
                withAnimation={true}
              />
            ) : null}
            <span>Copiar link</span>
            <img
              height="35"
              width="35"
              src={`/icons/nd-link-icon-${variant}.png`}
              alt="copiar"
            />
          </>
        </Button>
        <Button
          onClick={resetState}
          size="sm"
          variant={variant === "needs" ? "primary" : "secondary"}
        >
          Limpiar filtros
        </Button>
      </Container>
    </>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  width: ${({ theme }) => theme.desktop_container};
`;
