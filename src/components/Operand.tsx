import * as React from "react";
import OperationItemContainer from "./OperationItemContainer";
import SplitButton from "./SplitButton";

export interface IOperandProps {
  title: string;
  handleMenuItemClick: Function;
}

export default function Operand(props: IOperandProps) {
  return (
    <React.Fragment>
      <OperationItemContainer
        title={props?.title}
        operationItem={
          <SplitButton handleMenuItemClick={props?.handleMenuItemClick} />
        }
      />
    </React.Fragment>
  );
}

Operand.defaultProps = {
  title: "Operand",
  handleMenuItemClick: () => {},
};
