import * as React from "react";
import { operationExpression } from "../utilities/arithmeticOperations";
import OperationItemContainer from "./OperationItemContainer";

export interface IExpressionProps {
  leftOperand: string;
  rightOperand: string;
  operator: string;
}

export default function Expression(props: IExpressionProps) {
  return (
    <React.Fragment>
      <OperationItemContainer
        title={"Expression :"}
        operationItem={
          <code>
            {operationExpression(
              props?.leftOperand,
              props?.rightOperand,
              props?.operator
            )}
          </code>
        }
        orientation={"vertical"}
      />
    </React.Fragment>
  );
}

Expression.defaultProps = {
  leftOperand: "______",
  rightOperand: "______",
  operator: "__________",
};
