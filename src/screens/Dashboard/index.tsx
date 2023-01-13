import * as React from "react";
import { Container, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import Calculations from "./Calculations";
import { Copyright, OperationInput, OperationOutput } from "../../components";
import { ApplicationBar, BaseLayout, DrawerNav, Main } from "../../layouts";
import { operandListItems, operatorListItems } from "../../utilities/listItems";
import {
  evalOperationExpression,
  operationExpression,
} from "../../utilities/arithmeticOperations";
import { useAuth } from "../../RootRouter";
import {
  useGet_CalculationsQuery,
  usePost_CalculationMutation,
} from "../../graphql-codegen/graphql";
import { useSnackbar } from "notistack";

const drawerWidth: number = 240;

function DashboardContent() {
  const client = useApolloClient();

  const { enqueueSnackbar } = useSnackbar();
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
  const [expression, setExpression] = React.useState<string | undefined>(
    undefined
  );
  const [submitButtonDisabled, setSubmitButtonDisable] =
    React.useState<boolean>(true);
  const [calculationsLimit, setCalculationsLimit] = React.useState<number>(5);

  React.useEffect(() => {
    if (auth!?.user?.type === "student") {
      setCalculationsLimit(15);
    }
  }, []);

  React.useEffect(() => {
    if (leftOperand! && rightOperand! && operator!) {
      setSubmitButtonDisable(false);

      const exp = operationExpression(
        leftOperand?.toLocaleLowerCase(),
        rightOperand?.toLocaleLowerCase(),
        operator
      );

      setExpression(exp);
      setResult(evalOperationExpression(exp)!?.toString() ?? "∞");
    } else {
      setSubmitButtonDisable(true);
      setResult(undefined);
    }
  }, [leftOperand, rightOperand, operator]);

  const [postCalculation, postCalculationResult] =
    usePost_CalculationMutation();

  const { data, loading, error, fetchMore } = useGet_CalculationsQuery({
    variables: {
      input: {
        cursor: 0,
        limit: calculationsLimit,
      },
    },
  });

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
    if (value!) {
      setOperator(
        operatorListItems?.find((operator) => operator?.value === value)?.value!
      );
    } else {
      setOperator(undefined);
    }
  };

  const logout = () => {
    client?.clearStore();
    auth.signout(() => navigate("/"));
  };

  const submitCalculation = () => {
    if (leftOperand! && rightOperand! && operator! && result!) {
      postCalculation({
        variables: {
          input: {
            expression: expression!,
            operationName: operator!,
            result: result!,
          },
        },
        update: (cache, { data }) => {
          const cacheId = cache?.identify(data?.post_calculation!);
          cache.modify({
            fields: {
              get_calculations: (existingFieldData, { toReference }) => {
                return [...existingFieldData?.edgeds, toReference(cacheId!)];
              },
            },
          });
        },
      });

      enqueueSnackbar("Calculation posted successfully", {
        variant: "success",
      });
    }
  };

  if (postCalculationResult?.error) {
    enqueueSnackbar(postCalculationResult?.error?.message, {
      variant: "error",
    });
  }

  if (postCalculationResult?.data!) {
  }

  const fetchMoreCalculations = () => {
    const cursor = data?.get_calculations?.pageInfo?.cursor;
    const hasMore = data?.get_calculations?.pageInfo?.hasMore;

    if (cursor! && hasMore) {
      fetchMore({
        variables: {
          input: {
            cursor: cursor,
            limit: calculationsLimit,
          },
        },
      });
    }
  };

  if (error) {
  }

  return (
    <BaseLayout>
      <ApplicationBar
        open={open}
        drawerWidth={drawerWidth}
        toggleDrawer={toggleDrawer}
        logout={logout}
        firstName={auth!?.user?.firstName!}
        lastName={auth!?.user?.lastName!}
      />
      <DrawerNav
        open={open}
        drawerWidth={drawerWidth}
        toggleDrawer={toggleDrawer}
      />
      <Main>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {auth!?.user?.type === "master" && (
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
                  submitCalculation={submitCalculation}
                  submitButtonDisabled={submitButtonDisabled}
                  loading={postCalculationResult?.loading}
                />
              </Grid>
            </Grid>
          )}
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Paper
                sx={{ mt: 1, p: 2, display: "flex", flexDirection: "column" }}
              >
                <Calculations
                  calculations={data?.get_calculations?.edgeds}
                  loading={loading}
                  fetchMore={fetchMoreCalculations}
                  hasMore={data?.get_calculations?.pageInfo?.hasMore}
                  type={auth!?.user?.type!}
                />
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
