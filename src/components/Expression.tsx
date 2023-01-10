import * as React from "react";
import OperationItemContainer from "./OperationItemContainer";

export interface IExpressionProps {
  leftOperand?: string;
  rightOperand?: string;
  operator?: string;
}

export default function Expression(props: IExpressionProps) {
  return (
    <React.Fragment>
      <OperationItemContainer
        title={"Expression :"}
        operationItem={
          <code>
            {props?.leftOperand}( {props?.operator}( {props?.rightOperand}() ) )
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
