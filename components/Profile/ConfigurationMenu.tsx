import { useEffect, useState } from "react";
import styled from "styled-components";
import { Geo, SelectedFilter, SessionUser } from "../../interfaces";
import { fetchCities, parseGeoData } from "../../utils/helpers";
import Button from "../Styled/Button";
import Dropdown from "../Styled/Dropdown";
import Input from "../Styled/Input";

interface IProps {
  provinces: Geo[];
  user: SessionUser;
}

export default function ConfigurationMenu({ provinces, user }: IProps) {
  const [selectedProvince, setSelectedProvince] = useState<SelectedFilter>();
  const [selectedCity, setSelectedCity] = useState<SelectedFilter>();
  const [userPhone, setUserPhone] = useState<string>(
    user.phone ? user.phone : ""
  );
  const [userCanMove, setUserCanMove] = useState<boolean | null | undefined>(
    user.can_move
  );
  const [cities, setCities] = useState<Geo[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user.province) {
      const settedProvince = provinces.find((p) => p.nombre === user.province);
      if (settedProvince) {
        setSelectedProvince({
          name: settedProvince.nombre,
          id: settedProvince.id,
        });
      } else setSelectedProvince(undefined);
    }
  }, [user]);

  useEffect(() => {
    if (user.city && cities.length) {
      const settedCity = cities.find((c) => c.nombre === user.city);
      if (settedCity) {
        setSelectedCity({
          name: settedCity.nombre,
          id: settedCity.id,
        });
      } else setSelectedCity(undefined);
    }
  }, [user, cities]);

  useEffect(() => {
    if (selectedProvince !== undefined) {
      fetchCities(setCities, selectedProvince.id);
    } else {
      setSelectedCity(undefined);
      setCities([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (
      selectedProvince &&
      selectedCity &&
      userPhone &&
      userCanMove !== undefined &&
      userCanMove !== null
    )
      return setIsButtonDisabled(false);
    return setIsButtonDisabled(true);
  }, [selectedProvince, selectedCity, userPhone, userCanMove]);

  const PROVINCES_OPTIONS = parseGeoData(
    {
      name: "Provincia",
      onSelection: () => setSelectedProvince(undefined),
    },
    provinces,
    (name, id) => setSelectedProvince({ name, id })
  );

  const handleSaveChanges = () => {
    const body = JSON.stringify({
      user_id: user.user_id,
      province: selectedProvince!.name,
      city: selectedCity!.name,
      phone: userPhone!,
      can_move: userCanMove!,
    });
    setIsLoading(true);
    fetch("/api/users/update-contact-columns", {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then(() => setIsLoading(false))
      .catch((e) => {
        setIsLoading(false);
        console.error(e);
      });
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="menu-field">
          <p>Provincia</p>
          <Dropdown
            initialValue={user.province}
            variant="donations"
            options={PROVINCES_OPTIONS}
          />
        </div>
        <div className="menu-field">
          <p>Localidad</p>
          <Dropdown
            disabled={cities.length < 1}
            initialValue={user.city}
            variant="donations"
            options={parseGeoData(
              {
                name: "Localidad",
                onSelection: () => setSelectedCity(undefined),
              },
              cities,
              (name, id) => setSelectedCity({ name, id })
            )}
          />
        </div>
        <div className="menu-field">
          <p>Teléfono</p>
          <Input
            borderColor="#c7c7c7"
            height="40px"
            onChange={(v: string) => setUserPhone(v)}
            placeholder="+54 11 1531234567"
            textAlign="left"
            value={userPhone}
            width="240px"
          />
        </div>
        <div className="menu-field">
          <p>Tiene movilidad</p>
          <Dropdown
            initialValue={
              user.can_move === true
                ? "Si"
                : user.can_move === false
                ? "No"
                : undefined
            }
            variant="donations"
            options={[
              {
                name: "Movilidad",
                onSelection: () => setUserCanMove(undefined),
              },
              { name: "Si", onSelection: () => setUserCanMove(true) },
              { name: "No", onSelection: () => setUserCanMove(false) },
            ]}
          />
        </div>
        <span className="disclaimer">
          * Esta opción puede ser modificada en cada publicación
        </span>
      </div>
      <Button disabled={isButtonDisabled} onClick={handleSaveChanges}>
        {isLoading ? "Guardando..." : "Guardar cambios"}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 100%;
  > div.container {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    > div.menu-field {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      width: 100%;
      > p {
        font-size: 20px;
      }
    }
    > span.disclaimer {
      align-self: flex-start;
      font-size: 10px;
      font-style: italic;
      margin-top: -20px;
    }
  }
`;
