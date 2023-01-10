import * as React from "react";
import { operatorListItems } from "../utilities/listItems";
import ColorToggleButton from "./ColorToggleButton";
import OperationItemContainer from "./OperationItemContainer";

export interface IOperatorProps {
  handleChange: Function;
}

export default function Operator(props: IOperatorProps) {
  return (
    <React.Fragment>
      <OperationItemContainer
        title={"Operator :"}
        operationItem={
          <ColorToggleButton
            options={operatorListItems}
            handleChange={props?.handleChange}
          />
        }
      />
    </React.Fragment>
  );
}

Operator.defaultProps = {
  handleChange: () => {},
};
