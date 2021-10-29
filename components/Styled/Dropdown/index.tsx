import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../Button";

type Variant = "needs" | "donations";

interface DropdownOption {
  id: string;
  onSelection: () => void;
}

interface IProps {
  options: DropdownOption[];
  variant: Variant;
}

export default function Dropdown({ variant = "needs", options }: IProps) {
  const [showingOption, setShowingOption] = useState<DropdownOption>(
    options[0]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    if (dropdownRef.current) {
      const isClickingOut =
        clientX >
          dropdownRef.current.offsetLeft + dropdownRef.current.offsetWidth ||
        clientX < dropdownRef.current.offsetLeft ||
        clientY >
          dropdownRef.current.offsetTop + dropdownRef.current.offsetHeight ||
        clientY < dropdownRef.current.offsetTop;
      if (isClickingOut) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    isOpen && document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const handleSelection = (o: DropdownOption) => {
    setShowingOption(o);
    o.onSelection();
    setIsOpen(false);
  };

  return (
    <DropdownContainer variant={variant}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        fWeight={showingOption.id !== options[0].id ? "600" : "400"}
        size="md"
        variant="dropdown"
        width="240px"
      >
        <>
          {showingOption.id}
          <img
            alt="flecha"
            className={isOpen ? "rotate" : ""}
            src={`/icons/dropdown-${variant}-arrow-icon.png`}
          />
        </>
      </Button>
      {isOpen ? (
        <div className="options-container" ref={dropdownRef}>
          {options.map((o) => (
            <span key={o.id} onClick={() => handleSelection(o)}>
              {o.id}
            </span>
          ))}
        </div>
      ) : null}
    </DropdownContainer>
  );
}

interface StyleProps {
  variant: Variant;
}

const DropdownContainer = styled.div`
  position: relative;
  > button img {
    height: 30px;
    width: 30px;
    transition: all 0.4s ease;
    &.rotate {
      transform: rotate(180deg);
    }
  }
  > div.options-container {
    background: ${({ theme }) => theme.white};
    border: 4px solid ${({ theme }) => theme.gray};
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    overflow-y: auto;
    max-height: 200px;
    position: absolute;
    top: 110%;
    width: 100%;
    z-index: 3;
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.gray};
      border-radius: 0 5px 5px 0;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.dark_gray};
      border-radius: 0 5px 5px 0;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${({
        variant,
        //@ts-ignore
        theme,
      }: StyleProps) =>
        variant === "needs" ? theme.primary_red : theme.primary_green};
    }
    > span {
      background: ${({ theme }) => theme.white};
      border-bottom: 1px solid ${({ theme }) => theme.gray};
      display: block;
      padding: 10px 20px;
      width: 100%;
      &:first-child {
        border-radius: 10px 10px 0 0;
      }
      &:last-child {
        border-radius: 0 0 10px 10px;
        border-bottom: 0;
      }
      &:hover {
        background: ${({
          variant,
          //@ts-ignore
          theme,
        }: StyleProps) =>
          variant === "needs" ? theme.primary_red : theme.primary_green};
        color: ${({ theme }) => theme.white};
        font-weight: 600;
      }
    }
  }
`;
