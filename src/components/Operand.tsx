import * as React from "react";
import OperationItemContainer from "./OperationItemContainer";
import SplitButton from "./SplitButton";

export interface IOperandProps {
  title: string;
}

export default function Operand(props: IOperandProps) {
  return (
    <React.Fragment>
      <OperationItemContainer
        title={props?.title}
        operationItem={<SplitButton />}
      />
    </React.Fragment>
  );
}
