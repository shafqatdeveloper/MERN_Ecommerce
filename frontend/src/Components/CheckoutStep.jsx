import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { FaShippingFast } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { ImLibrary } from "react-icons/im";

import React, { Fragment } from "react";
import { Typography } from "@mui/material";

const CheckoutStep = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <FaShippingFast />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <BsCheckCircle />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <ImLibrary />,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
            key={index}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato " : "rgba(0,0,0,0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutStep;
