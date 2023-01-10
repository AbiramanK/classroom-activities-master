import * as React from "react";
import { Grid, GridProps } from "@mui/material";

export interface IGridItemAlignCenterProps {
  children: React.ReactNode;
  gridItemProps?: GridProps;
}

export default function GridItemAlignCenter(props: IGridItemAlignCenterProps) {
  return (
    <React.Fragment>
      <Grid
        item
        alignItems={"center"}
        justifyContent={"center"}
        {...props.gridItemProps}
      >
        {props.children}
      </Grid>
    </React.Fragment>
  );
}
