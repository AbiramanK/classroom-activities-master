import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Calculations from "./Calculations";
import { Copyright, OperationInput, OperationOutput } from "../../components";
import { ApplicationBar, BaseLayout, DrawerNav, Main } from "../../layouts";

const drawerWidth: number = 240;

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <BaseLayout>
      <ApplicationBar
        open={open}
        drawerWidth={drawerWidth}
        toggleDrawer={toggleDrawer}
      />
      <DrawerNav
        open={open}
        drawerWidth={drawerWidth}
        toggleDrawer={toggleDrawer}
      />
      <Main>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={1}>
            {/* Operation  */}
            <Grid item xs={12} md={8} lg={8}>
              <OperationInput />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <OperationOutput />
            </Grid>
            <Grid item xs={12}>
              <Paper
                sx={{ mt: 1, p: 2, display: "flex", flexDirection: "column" }}
              >
                <Calculations />
              </Paper>
            </Grid>
          </Grid>
          <Copyright titleProps={{ pt: 4 }} />
        </Container>
      </Main>
    </BaseLayout>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
