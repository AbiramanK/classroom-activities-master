import * as React from "react";
import { Button, Grid } from "@mui/material";
import Expression from "./Expression";
import Result from "./Result";
import OperationContainer from "./OperationContainer";

export interface IOperationOutputProps {
  leftOperand: string;
  rightOperand: string;
  operator: string;
  result: string;
}

export default function OperationOutput(props: IOperationOutputProps) {
  return (
    <React.Fragment>
      <OperationContainer title="Output">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Expression
              leftOperand={props?.leftOperand}
              rightOperand={props?.rightOperand}
              operator={props?.operator}
            />
          </Grid>
          <Grid item xs={12}>
            <Result result={props?.result} />
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Button variant="contained">Submit</Button>
          </Grid>
        </Grid>
      </OperationContainer>
    </React.Fragment>
  );
}

OperationOutput.defaultProps = {
  leftOperand: "______",
  rightOperand: "______",
  operator: "__________",
  result: "-",
};
