import { Paper } from "@mui/material";
import * as React from "react";
import OperationHeader from "./OperationHeader";

export interface IOperationContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function OperationContainer(props: IOperationContainerProps) {
  return (
    <React.Fragment>
      <OperationHeader title={props?.title} />
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 270,
          borderTopLeftRadius: 0,
        }}
      >
        {props?.children}
      </Paper>
    </React.Fragment>
  );
}
