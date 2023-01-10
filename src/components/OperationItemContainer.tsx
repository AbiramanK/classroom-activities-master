import * as React from "react";
import { Grid } from "@mui/material";
import GridItemAlignCenter from "./GridItemAlignCenter";
import Title from "./Title";

export interface IOperationItemContainerProps {
  title: string;
  operationItem: React.ReactNode;
  orientation?: "vertical" | "horizontal";
}

export default function OperationItemContainer(
  props: IOperationItemContainerProps
) {
  return (
    <React.Fragment>
      <Grid container>
        <GridItemAlignCenter
          gridItemProps={{ xs: props?.orientation === "horizontal" ? 3 : 12 }}
        >
          <Title>{props?.title}</Title>
        </GridItemAlignCenter>
        <GridItemAlignCenter
          gridItemProps={{ xs: props?.orientation === "horizontal" ? 9 : 12 }}
        >
          {props?.operationItem}
        </GridItemAlignCenter>
      </Grid>
    </React.Fragment>
  );
}

OperationItemContainer.defaultProps = {
  title: "Operation Item",
  operationItem: <></>,
  orientation: "horizontal",
};
