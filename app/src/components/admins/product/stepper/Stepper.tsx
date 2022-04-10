import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['ProductSetting', 'Formats & Genres', 'Character & Cast','Staff & Studio','Episord'];

type Props = {
  activeStep : number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>

  completed: {[k: number]: boolean;}
  setCompleted:React.Dispatch<React.SetStateAction<{[k: number]: boolean;}>>
  handleComplete: () => void

  allStepsCompleted: () => boolean
  handleNext: () => void
  // handleComplete: () => void
  completedSteps: () => number
  totalSteps: () => number
}

export const HorizontalNonLinearStepper:React.FC<Props> = (Props) => {
  
  // const [activeStep, setActiveStep] = React.useState(0);
  // const [completed, setCompleted] = React.useState<{
  //   [k: number]: boolean;
  // }>({});

  // const totalSteps = () => {
  //   return steps.length;
  // };

  // const completedSteps = () => {
  //   return Object.keys(Props.completed).length;
  // };

  // const isLastStep = () => {
  //   return Props.activeStep === totalSteps() - 1;
  // };

  // const allStepsCompleted = () => {
  //   return completedSteps() === totalSteps();
  // };

  // const handleNext = () => {
  //   const newActiveStep =
  //     isLastStep() && !allStepsCompleted()
  //       ? // It's the last step, but not all steps have been completed,
  //         // find the first step that has been completed
  //         steps.findIndex((step, i) => !(i in Props.completed))
  //       : Props.activeStep + 1;
  //   Props.setActiveStep(newActiveStep);
  // };

  const handleBack = () => {
    Props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    Props.setActiveStep(step);
  };

  // const handleComplete = () => {
  //   const newCompleted = Props.completed;
  //   newCompleted[Props.activeStep] = true;
  //   Props.setCompleted(newCompleted);
  //   handleNext();
  // };

  console.log(Props.completed)

  const handleReset = () => {
    Props.setActiveStep(0);
    Props.setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={Props.activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={Props.completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {Props.allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              {/* <Button onClick={handleReset}>Reset</Button> */}
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={Props.activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={Props.handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {Props.activeStep !== steps.length &&
                (Props.completed[Props.activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {Props.activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={Props.handleComplete}>
                    {Props.completedSteps() === Props.totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                  // resetbotton
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}