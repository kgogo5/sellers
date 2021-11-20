import { Step, StepLabel, Stepper } from "@mui/material";
import { COLOR } from "../../commons";

import styled from "styled-components";

interface StepperInterface {
  activeStep: number;
  steps: any;
}

const StepperWrap = styled(Stepper)`
  && {
    background: none;
  }

  & .MuiStepIcon-active {
    fill: ${COLOR.text};
  }

  & .MuiStepIcon-completed path {
    fill: ${COLOR.fill};
  }

  & .MuiStepIcon-text {
    color: ${COLOR.text};
  }
`;

const StepLabels = styled(StepLabel)`
  & .MuiStepLabel-label {
    color: ${COLOR.fill};

    &.MuiStepLabel-active {
      font-weight: bold;
      color: ${COLOR.text};
    }
    &.MuiStepLabel-completed {
      color: ${COLOR.fill};
    }
  }

  & svg,
  & path {
    fill: ${COLOR.fill};
  }
  & .MuiStepIcon-text {
    fill: ${COLOR.fill};
    font-weight: bold;
  }
`;

const _ = ({ activeStep, steps }: StepperInterface) => {
  return (
    <StepperWrap alternativeLabel activeStep={activeStep}>
      {steps.map((label: string) => (
        <Step key={label}>
          <StepLabels>{label}</StepLabels>
        </Step>
      ))}
    </StepperWrap>
  );
};

export default _;
