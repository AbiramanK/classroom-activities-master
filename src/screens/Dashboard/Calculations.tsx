import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Title } from "../../components";

// Generate Calculation Data
function createData(
  id: number,
  date: string,
  name: string,
  calculation: string,
  result: number
) {
  return { id, date, operationName: name, calculation, result };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Division",
    "eight( divided_by( three() ) )",
    2
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Multiplication",
    "seven( times( five() ) )",
    35
  ),
  createData(2, "16 Mar, 2019", "Subtraction", "eight( minus( three() ) )", 5),
  createData(3, "16 Mar, 2019", "Division", "six( divided_by( two() ) )", 3),
  createData(4, "15 Mar, 2019", "Addition", "one( plus( four() ) )", 5),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Calculations() {
  return (
    <React.Fragment>
      <Title>Recent Calculations</Title>
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.operationName}</TableCell>
              <TableCell>{row.calculation}</TableCell>
              <TableCell align="right">{`${row.result}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more calculations
      </Link>
    </React.Fragment>
  );
}
