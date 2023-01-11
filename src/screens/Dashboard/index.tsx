import * as React from "react";
import { Container, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Calculations from "./Calculations";
import { Copyright, OperationInput, OperationOutput } from "../../components";
import { ApplicationBar, BaseLayout, DrawerNav, Main } from "../../layouts";
import { operandListItems, operatorListItems } from "../../utilities/listItems";
import {
  evalOperationExpression,
  operationExpression,
} from "../../utilities/arithmeticOperations";
import { useAuth } from "../../RootRouter";

const drawerWidth: number = 240;

function DashboardContent() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [leftOperand, setLeftOperand] = React.useState<string | undefined>(
    undefined
  );
  const [rightOperand, setRightOperand] = React.useState<string | undefined>(
    undefined
  );
  const [operator, setOperator] = React.useState<string | undefined>(undefined);
  const [result, setResult] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (leftOperand! && rightOperand! && operator!) {
      const exp = operationExpression(
        leftOperand?.toLocaleLowerCase(),
        rightOperand?.toLocaleLowerCase(),
        operator
      );

      setResult(evalOperationExpression(exp)!?.toString() ?? "∞");
    }
  }, [leftOperand, rightOperand, operator]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLeftOperandChnage = (value: string) => {
    setLeftOperand(
      operandListItems.find((operand) => operand?.value === value)?.label!
    );
  };

  const handleRightOperandChnage = (value: string) => {
    setRightOperand(
      operandListItems.find((operand) => operand?.value === value)?.label!
    );
  };

  const handleOperatorChnage = (value: string) => {
    setOperator(
      operatorListItems?.find((operator) => operator?.value === value)?.value!
    );
  };

  const logout = () => {
    auth.signout(() => navigate("/"));
  };

  return (
    <BaseLayout>
      <ApplicationBar
        open={open}
        drawerWidth={drawerWidth}
        toggleDrawer={toggleDrawer}
        logout={logout}
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
              <OperationInput
                handleLeftOperandChnage={handleLeftOperandChnage}
                handleRightOperandChnage={handleRightOperandChnage}
                handleOperatorChnage={handleOperatorChnage}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <OperationOutput
                leftOperand={leftOperand}
                rightOperand={rightOperand}
                operator={operator}
                result={result}
              />
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
