import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Title } from "../../components";
import { CalculationModel } from "../../graphql-codegen/graphql";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import { operatorListItems } from "../../utilities/listItems";
import moment from "moment";

interface ICalculations {
  calculations: CalculationModel[];
  loading: boolean;
  fetchMore: Function;
  hasMore: boolean;
  type: string;
}

export default function Calculations(props: ICalculations) {
  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
    if (props?.hasMore) {
      props?.fetchMore();
    }
  }
  return (
    <React.Fragment>
      <Title>{props?.type === "master" ? "Recent " : ""}Calculations</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Operation Name</TableCell>
            <TableCell>Calculation</TableCell>
            <TableCell align="right">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.calculations?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{moment(row?.updated_at!).format("ll")}</TableCell>
              <TableCell>
                {
                  operatorListItems?.find(
                    (operator) => operator?.value === row?.operation_name
                  )!?.label!
                }
              </TableCell>
              <TableCell>
                <code>{row?.expression}</code>
              </TableCell>
              <TableCell align="right">{`${row?.result}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {props?.loading && (
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ mt: 2 }}
          spacing={1}
        >
          <Grid item xs={12} md={12}>
            <Typography sx={{ textAlign: "center" }}>Loading...</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <LinearProgress />
          </Grid>
        </Grid>
      )}

      {!props?.loading && props?.calculations?.length === 0 && (
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ mt: 2 }}
          spacing={1}
        >
          <Grid item xs={12} md={12}>
            <Typography sx={{ textAlign: "center" }}>
              Calculations not availabe
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Button
            color="primary"
            onClick={preventDefault}
            sx={{ fontSize: 15 }}
            disabled={!props?.hasMore}
          >
            See more calculations
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Calculations.defaultProps = {
  calculations: [],
  loading: true,
  fetchMore: () => {},
  hasMore: false,
  type: "master",
};
