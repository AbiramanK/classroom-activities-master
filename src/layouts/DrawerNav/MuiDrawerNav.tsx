import {
  styled,
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
} from "@mui/material";

interface MuiDrawerNavProps extends MuiDrawerProps {
  open?: boolean;
  drawerWidth?: number;
}

export const MuiDrawerNav = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<MuiDrawerNavProps>(({ theme, open, drawerWidth }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

MuiDrawerNav.defaultProps = {
  open: false,
  drawerWidth: 240,
};
