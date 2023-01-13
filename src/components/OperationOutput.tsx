import * as React from "react";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Expression from "./Expression";
import Result from "./Result";
import OperationContainer from "./OperationContainer";

export interface IOperationOutputProps {
  leftOperand: string;
  rightOperand: string;
  operator: string;
  result: string;
  submitCalculation: Function;
  submitButtonDisabled: boolean;
  loading: boolean;
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
            <LoadingButton
              onClick={() => props?.submitCalculation()}
              variant="contained"
              disabled={props?.submitButtonDisabled}
              loading={props?.loading}
            >
              <span>Submit</span>
            </LoadingButton>
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
  submitCalculation: () => {},
  submitButtonDisabled: true,
  loading: false,
};
