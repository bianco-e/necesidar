import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { initialState, reducer, SET_FIELD } from "./reducer";
import usePublishDictionary from "./usePublishDictionary";
import { LARGE_BREAKPOINT, SMALL_BREAKPOINT } from "../../utils/constants";

const STEPS = [StepOne, StepTwo];
const ALLOWED_TYPES: string[] = ["1", "2"];

export default function Publish() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const CurrentComponent = STEPS[state.currentStep];

  const setField = (field: string, value: any) =>
    dispatch({ type: SET_FIELD, payload: { field, value } });

  useEffect(() => {
    const type = Array.isArray(router.query.type)
      ? router.query.type[0]
      : router.query.type;
    if (type && ALLOWED_TYPES.includes(type)) {
      setField("publicationType", parseInt(type));
      router.push({ query: {} });
    }
  }, [router.query]);

  useEffect(() => {
    if (process.browser) {
      window.scrollTo(0, 0);
    }
  }, [state.currentStep]);

  return (
    <Wrapper>
      <ProgressBar
        fillColor={usePublishDictionary("color", state.publicationType)}
        currentStep={state.currentStep}
        totalSteps={STEPS.length}
      />
      <Title>Tu {usePublishDictionary("title", state.publicationType)}</Title>
      <CurrentComponent setField={setField} state={state} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.desktop_container};
  > span.disclaimer {
    font-size: 12px;
    font-style: italic;
  }
  @media (max-width: ${LARGE_BREAKPOINT}) {
    width: ${({ theme }) => theme.tablet_container};
  }
  @media (max-width: ${SMALL_BREAKPOINT}) {
    width: ${({ theme }) => theme.mobile_container};
  }
`;

const Title = styled.h1`
  align-self: center;
  font-size: 36px;
  font-weight: 600;
  margin: 30px 0 50px 0;
`;
