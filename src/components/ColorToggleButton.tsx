import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { OperandListInterface } from "../utilities/listItems";

interface IColorToggleButton {
  options: OperandListInterface[];
  handleChange: Function;
}

export default function ColorToggleButton(props: IColorToggleButton) {
  const [value, setValue] = React.useState<string | undefined>(undefined);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    props?.handleChange(newValue);
    setValue(newValue);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      fullWidth
      size="small"
    >
      {props?.options?.map((operator) => (
        <ToggleButton key={`${operator?.value}`} value={`${operator?.value}`}>
          {operator?.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

ColorToggleButton.defaultProps = {
  options: [],
  handleChange: () => {},
};
