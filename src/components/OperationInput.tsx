import * as React from "react";
import { Grid } from "@mui/material";
import Operand from "./Operand";
import Operator from "./Operator";
import OperationContainer from "./OperationContainer";

export interface IOperationInputProps {}

export default function OperationInput(props: IOperationInputProps) {
  return (
    <React.Fragment>
      <OperationContainer title="Input">
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Operand title="Left Operand :" />
          </Grid>
          <Grid item xs={12}>
            <Operator />
          </Grid>
          <Grid item xs={12}>
            <Operand title="Right Operand :" />
          </Grid>
        </Grid>
      </OperationContainer>
    </React.Fragment>
  );
}
