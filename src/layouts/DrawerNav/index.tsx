import * as React from "react";
import { Toolbar, IconButton, Divider, List } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Title } from "../../components";
import { mainListItems } from "../../utilities/listItems";
import { MuiDrawerNav } from "./MuiDrawerNav";

export interface IDrawerNavProps {
  open?: boolean;
  drawerWidth?: number;
  toggleDrawer: Function;
}

export default function DrawerNav(props: IDrawerNavProps) {
  return (
    <React.Fragment>
      <MuiDrawerNav
        variant="permanent"
        open={props?.open}
        drawerwidth={props?.drawerWidth}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
          }}
        >
          <Title titleProps={{ marginBottom: 0 }}>Classroom Activities</Title>
          <IconButton onClick={() => props?.toggleDrawer()}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">{mainListItems}</List>
      </MuiDrawerNav>
    </React.Fragment>
  );
}

DrawerNav.defaultProps = {
  drawerWidth: 240,
  open: false,
};
