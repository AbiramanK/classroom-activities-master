import * as React from "react";
import { Toolbar, IconButton, Typography, Badge, Avatar } from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { MuiApplicationBar } from "./MuiApplicationBar";

export interface IApplicationBarProps {
  open?: boolean;
  drawerWidth?: number;
  toggleDrawer: Function;
}

export default function ApplicationBar(props: IApplicationBarProps) {
  return (
    <React.Fragment>
      <MuiApplicationBar
        position="absolute"
        open={props?.open}
        drawerWidth={props?.drawerWidth}
      >
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => props?.toggleDrawer()}
            sx={{
              marginRight: "36px",
              ...(props?.open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Typography sx={{ marginInline: 2 }}>Cindy Baker</Typography>
          <Avatar
            alt="Cindy Baker"
            src="https://mui.com/static/images/avatar/3.jpg"
          />
        </Toolbar>
      </MuiApplicationBar>
    </React.Fragment>
  );
}

ApplicationBar.defaultProps = {
  drawerWidth: 240,
  open: false,
};
