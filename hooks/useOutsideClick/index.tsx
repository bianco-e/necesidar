import { useEffect } from "react";

type Setter = (bool: boolean) => void;
type Ref = React.RefObject<HTMLDivElement>;

export default function useOutsideClick(
  ref: Ref,
  setIsOpen: Setter,
  isOpen: boolean
) {
  const handleClickOutside = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    if (ref.current) {
      const isClickingOut =
        clientX > ref.current.offsetLeft + ref.current.offsetWidth ||
        clientX < ref.current.offsetLeft ||
        clientY > ref.current.offsetTop + ref.current.offsetHeight ||
        clientY < ref.current.offsetTop;
      if (isClickingOut) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    isOpen && document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return null;
}
