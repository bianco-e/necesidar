import { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

interface IProps {
  slides: { image: string; alt: string }[];
  variant: "needs" | "donations";
}

export default function ImagesSlider({ slides, variant }: IProps) {
  if (slides.length < 1) return null;
  const [current, setCurrent] = useState<number>(0);
  const [lastButtonPressed, setLastButtonPressed] =
    useState<keyof typeof ANIMATIONS>();
  const [currentAnimation, setCurrentAnimation] = useState<any>();

  const nextSlide = () => {
    setLastButtonPressed("next");
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };
  const previousSlide = () => {
    setLastButtonPressed("previous");
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  useEffect(() => {
    lastButtonPressed && setCurrentAnimation(ANIMATIONS[lastButtonPressed]);
    setTimeout(() => {
      setCurrentAnimation(undefined);
    }, 650);
  }, [current]);

  return (
    <SliderWrapper>
      <ArrowButton
        aria-label="anterior"
        onClick={previousSlide}
        rotateDegrees="90deg"
        sideDistance="left: 20px;"
      >
        <img alt="anterior" src={`/icons/dropdown-${variant}-arrow-icon.png`} />
      </ArrowButton>
      <ArrowButton
        aria-label="siguiente"
        onClick={nextSlide}
        rotateDegrees="270deg"
        sideDistance="right: 20px;"
      >
        <img alt="anterior" src={`/icons/dropdown-${variant}-arrow-icon.png`} />
      </ArrowButton>
      <SlideImage
        alt={slides[current].alt}
        animation={currentAnimation}
        loading="lazy"
        src={slides[current].image}
      />
    </SliderWrapper>
  );
}

const slideFromLeftKf = keyframes`
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0%);
    }
`;
const slideFromRightKf = keyframes`
    0% {

        transform: translateX(100%);
    }
    100% {
        transform: translateX(0%);
    }
`;

const slideFromLeft = css`
  -webkit-animation: 0.65s ${slideFromLeftKf} forwards;
  animation: 0.65s ${slideFromLeftKf} forwards;
`;
const slideFromRight = css`
  -webkit-animation: 0.65s ${slideFromRightKf} forwards;
  animation: 0.65s ${slideFromRightKf} forwards;
`;

const ANIMATIONS = {
  previous: slideFromLeft,
  next: slideFromRight,
};

interface ButtonStyleProps {
  rotateDegrees: string;
  sideDistance: string;
}

interface SlideStyleProps {
  animation: any;
}

const SliderWrapper = styled.section`
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
`;

const SlideImage = styled.img`
  ${({ animation }: SlideStyleProps) => animation};
  border-radius: 10px;
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

const ArrowButton = styled.button`
  align-items: center;
  background: none;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  position: absolute;
  top: calc(50% - 25px);
  transition: all 0.3s ease;
  width: 50px;
  ${({ sideDistance }: ButtonStyleProps) => sideDistance};
  z-index: 2;
  > img {
    height: 40px;
    width: 40px;
    transform: rotate(
      ${({ rotateDegrees }: ButtonStyleProps) => rotateDegrees}
    );
  }
  &:hover {
    background: ${({ theme }) => theme.transparent};
  }
`;
