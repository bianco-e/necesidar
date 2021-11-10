import styled from "styled-components";
import Button from "../Styled/Button";
import Dropdown from "../Styled/Dropdown";
import Input from "../Styled/Input";

export default function ConfigurationMenu() {
  return (
    <Wrapper>
      <div className="container">
        <div className="menu-field">
          <p>Provincia</p>
          <Dropdown
            variant="donations"
            options={[{ name: "Provincia", onSelection: () => {} }]}
          />
        </div>
        <div className="menu-field">
          <p>Localidad</p>
          <Dropdown
            variant="donations"
            options={[{ name: "Localidad", onSelection: () => {} }]}
          />
        </div>
        <div className="menu-field">
          <p>Teléfono</p>
          <Input
            borderColor="#c7c7c7"
            height="40px"
            onChange={() => {}}
            value=""
            width="240px"
          />
        </div>
        <div className="menu-field">
          <p>Movilidad</p>
          <Dropdown
            variant="donations"
            options={[
              { name: "Si", onSelection: () => {} },
              { name: "No", onSelection: () => {} },
            ]}
          />
        </div>
        <span className="disclaimer">
          Esta opción puede ser modificada en cada publicación
        </span>
      </div>
      <Button onClick={() => {}}>Guardar cambios</Button>
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
    }
  }
`;
