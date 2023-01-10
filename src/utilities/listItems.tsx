import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Dashboard as DashboardIcon, Calculate } from "@mui/icons-material";

export interface OperandListInterface {
  value: string;
  label: string;
}

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Calculate />
      </ListItemIcon>
      <ListItemText primary="Calculations" />
    </ListItemButton>
  </React.Fragment>
);

export const operandListItems: OperandListInterface[] = [
  { value: "0", label: "Zero" },
  { value: "1", label: "One" },
  { value: "2", label: "Two" },
  { value: "3", label: "Three" },
  { value: "4", label: "Four" },
  { value: "5", label: "Five" },
  { value: "6", label: "Six" },
  { value: "7", label: "Seven" },
  { value: "8", label: "Eight" },
  { value: "9", label: "Nine" },
];

export const operatorListItems: string[] = [
  "Addition",
  "Subtraction",
  "Multiplication",
  "Division",
];
