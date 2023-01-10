import * as React from "react";
import { Grid } from "@mui/material";
import Operand from "./Operand";
import Operator from "./Operator";
import OperationContainer from "./OperationContainer";

export interface IOperationInputProps {
  handleLeftOperandChnage: Function;
  handleRightOperandChnage: Function;
  handleOperatorChnage: Function;
}

export default function OperationInput(props: IOperationInputProps) {
  return (
    <React.Fragment>
      <OperationContainer title="Input">
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Operand
              title="Left Operand :"
              handleMenuItemClick={props?.handleLeftOperandChnage}
            />
          </Grid>
          <Grid item xs={12}>
            <Operator handleChange={props?.handleOperatorChnage} />
          </Grid>
          <Grid item xs={12}>
            <Operand
              title="Right Operand :"
              handleMenuItemClick={props?.handleRightOperandChnage}
            />
          </Grid>
        </Grid>
      </OperationContainer>
    </React.Fragment>
  );
}

OperationInput.defaultProps = {
  handleLeftOperandChnage: () => {},
  handleRightOperandChnage: () => {},
  handleOperatorChnage: () => {},
};
