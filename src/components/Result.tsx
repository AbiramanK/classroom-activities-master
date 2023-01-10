import * as React from "react";
import OperationItemContainer from "./OperationItemContainer";

export interface IResultProps {
  result?: number;
}

export default function Result(props: IResultProps) {
  return (
    <React.Fragment>
      <OperationItemContainer
        title={"Result :"}
        operationItem={
          <pre>
            <code>{props?.result}</code>
          </pre>
        }
        orientation={"vertical"}
      />
    </React.Fragment>
  );
}

Result.defaultProps = {
  result: "-",
};
