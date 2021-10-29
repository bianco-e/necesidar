import { useEffect, useReducer } from "react";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { initialState, reducer, SET_FIELD } from "./reducer";
import usePublishDictionary from "./usePublishDictionary";

const STEPS = [StepOne, StepTwo];

export default function Publish() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (process.browser) {
      window.scrollTo(0, 0);
    }
  }, [state.currentStep]);

  const CurrentComponent = STEPS[state.currentStep];

  const setField = (field: string, value: any) =>
    dispatch({ type: SET_FIELD, payload: { field, value } });

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
`;

const Title = styled.h1`
  align-self: center;
  font-size: 36px;
  font-weight: 600;
  margin: 30px 0 50px 0;
`;
