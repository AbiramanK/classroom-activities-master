import * as React from "react";
import { Container, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { gql, useApolloClient } from "@apollo/client";
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
  useGet_CalculationsLazyQuery,
  usePost_CalculationMutation,
} from "../../graphql-codegen/graphql";
import { useSnackbar } from "notistack";
import moment from "moment";

const drawerWidth: number = 240;
const calculationsLimit: number = 5;

function DashboardContent() {
  const client = useApolloClient();

  const [postCalculation, postCalculationResult] =
    usePost_CalculationMutation();

  const [getCalculations, { data, loading, error, fetchMore }] =
    useGet_CalculationsLazyQuery();

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

  React.useEffect(() => {
    getCalculations({
      variables: {
        input: {
          limit: calculationsLimit,
          cursor: 0,
        },
      },
    });
  });

  const fetchCalculations = () => {
    getCalculations({
      variables: {
        input: {
          limit: calculationsLimit,
          cursor: 0,
        },
      },
      fetchPolicy: "no-cache",
    });
  };

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
      });

      const now = moment();

      const newCalculation = {
        id: data!?.get_calculations?.edgeds[0]?.id + 1,
        operation_name: operator,
        expression: expression,
        result: result,
        created_at: now,
        updated_at: now,
        deleted_at: null,
        posted_by: {
          id: 1,
          first_name: "Abiraman",
          last_name: "K",
          email: "abiramancit@gmail.com",
          type: "master",
          created_at: now,
          updated_at: now,
          deleted_at: null,
          __typename: "UserModel",
        },
        updated_by: {
          id: 1,
          first_name: "Abiraman",
          last_name: "K",
          email: "abiramancit@gmail.com",
          type: "master",
          created_at: now,
          updated_at: now,
          deleted_at: null,
          __typename: "UserModel",
        },
        deleted_by: null,
        __typename: "CalculationModel",
      };

      client?.cache?.modify({
        id: client?.cache?.identify({ __typename: "CalculationModel" }),
        fields: {
          calculations(existingCalculationRef, { readField }) {
            const newCalculationRef = client?.cache?.writeFragment({
              data: newCalculation,
              fragment: gql`
                fragment NewCalulation on CalculationModel {
                  id
                  operation_name
                  expression
                  result
                  created_at
                  updated_at
                  deleted_at
                  posted_by {
                    id
                    first_name
                    last_name
                    email
                    type
                    created_at
                    updated_at
                    deleted_at
                    __typename
                  }
                  updated_by {
                    id
                    first_name
                    last_name
                    email
                    type
                    created_at
                    updated_at
                    deleted_at
                    __typename
                  }
                  deleted_by
                }
              `,
            });

            if (
              existingCalculationRef.some(
                (ref: any) => readField("id", ref) === newCalculation.id
              )
            ) {
              return existingCalculationRef;
            }

            return [newCalculationRef, ...existingCalculationRef];
          },
        },
      });

      enqueueSnackbar("Calculation posted successfully", {
        variant: "success",
      });

      fetchCalculations();
    }
  };

  if (postCalculationResult?.error) {
    enqueueSnackbar(postCalculationResult?.error?.message, {
      variant: "error",
    });
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
            <Grid item xs={12}>
              <Paper
                sx={{ mt: 1, p: 2, display: "flex", flexDirection: "column" }}
              >
                <Calculations
                  calculations={data?.get_calculations?.edgeds}
                  loading={loading}
                  fetchMore={fetchMoreCalculations}
                  hasMore={data?.get_calculations?.pageInfo?.hasMore}
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
