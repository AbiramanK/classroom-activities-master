import {
  styled,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from "@mui/material";

interface IMuiApplicationBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth?: number;
}

export const MuiApplicationBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<IMuiApplicationBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

MuiApplicationBar.defaultProps = {
  drawerWidth: 240,
  open: false,
};
