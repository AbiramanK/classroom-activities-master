import * as React from "react";
import { Button, Grid } from "@mui/material";
import Expression from "./Expression";
import Result from "./Result";
import OperationContainer from "./OperationContainer";

export interface IOperationOutputProps {}

export default function OperationOutput(props: IOperationOutputProps) {
  return (
    <React.Fragment>
      <OperationContainer title="Output">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Expression />
          </Grid>
          <Grid item xs={12}>
            <Result />
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Button variant="contained">Submit</Button>
          </Grid>
        </Grid>
      </OperationContainer>
    </React.Fragment>
  );
}
