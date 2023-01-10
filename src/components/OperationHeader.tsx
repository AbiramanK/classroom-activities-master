import { Grid, Paper, PaperProps, TypographyProps } from "@mui/material";
import { GridProps } from "@mui/system";
import * as React from "react";
import Title from "./Title";

export interface IOperationHeaderProps {
  title: string;
  gridProps?: GridProps;
  paperProps?: PaperProps;
  titleProps?: TypographyProps;
}

export default function OperationHeader(props: IOperationHeaderProps) {
  return (
    <React.Fragment>
      <Grid item xs={12} md={7} lg={7} {...props.gridProps}>
        <Paper
          sx={{
            borderRadius: 0,
            p: 1,
            pl: 2,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: "#FFFFF8",
          }}
          {...props?.paperProps}
        >
          <Title titleProps={props?.titleProps}>{props?.title}</Title>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
