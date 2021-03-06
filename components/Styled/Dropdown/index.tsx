import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import styled from "styled-components";
import { ellipseText } from "../../../utils/helpers";
import Button from "../Button";

type Variant = "needs" | "donations";

interface DropdownOption {
  name: string;
  onSelection: () => void;
}

interface IProps {
  className?: string;
  disabled?: boolean;
  initialValue?: string;
  options: DropdownOption[];
  variant: Variant;
  width?: string;
}

export default function Dropdown({
  className = "nd-dropdown",
  disabled = false,
  initialValue,
  variant = "needs",
  options,
  width = "240px",
}: IProps) {
  const [showingOption, setShowingOption] = useState<DropdownOption>(
    options[0]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (initialValue) {
      setShowingOption({ name: initialValue, onSelection: () => {} });
    } else setShowingOption(options[0]);
  }, [initialValue]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useOutsideClick(dropdownRef, setIsOpen, isOpen);

  // Focus input to type option value
  useEffect(() => {
    if (isOpen && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [isOpen, inputRef]);

  // Check if typed value by user exists and focus that option
  useEffect(() => {
    if (isOpen && searchValue) {
      const foundOption = options.find((opt) =>
        opt.name.toLowerCase().startsWith(searchValue.toLowerCase())
      );
      if (foundOption) {
        const optionElement: HTMLElement | null = document.getElementById(
          `option-${foundOption.name.toLowerCase().split(" ").join("-")}`
        );
        if (optionElement) {
          optionElement.focus();
          inputRef.current!.focus();
        }
      }
      setTimeout(() => setSearchValue(""), 2000);
    }
  }, [isOpen, searchValue]);

  const handleSelection = (o: DropdownOption) => {
    setShowingOption(o);
    o.onSelection();
    setIsOpen(false);
  };

  return (
    <DropdownContainer className={className} variant={variant}>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        ref={inputRef}
        value={searchValue}
      />
      <Button
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        fWeight={showingOption.name !== options[0].name ? "600" : "400"}
        size="md"
        variant="dropdown"
        width={width}
      >
        <>
          {ellipseText(showingOption.name, 13)}
          <img
            alt="flecha"
            className={isOpen ? "rotate" : ""}
            src={`/icons/dropdown-${variant}-arrow-icon.png`}
          />
        </>
      </Button>
      {isOpen ? (
        <div className="options-container" ref={dropdownRef}>
          {options.map((o, i) => (
            <button
              id={`option-${o.name.toLowerCase().split(" ").join("-")}`}
              key={`${o.name}-${i}`}
              onClick={() => handleSelection(o)}
            >
              {o.name}
            </button>
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
  > input {
    opacity: 0;
    height: 1px;
    position: absolute;
    width: 1px;
  }
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
    > button {
      background: ${({ theme }) => theme.white};
      border: 0;
      border-bottom: 1px solid ${({ theme }) => theme.gray};
      cursor: pointer;
      display: block;
      font-size: 15px;
      margin: 0;
      min-height: 40px;
      overflow: hidden;
      padding: 10px 20px;
      text-align: left;
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
      }
      &:focus {
        background: ${({ theme }) => theme.gray};
        outline: none;
      }
    }
  }
`;
