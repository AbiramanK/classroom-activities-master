import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface IColorToggleButton {
  options: string[];
}

export default function ColorToggleButton(props: IColorToggleButton) {
  const [value, setValue] = React.useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
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
        <ToggleButton value={`${operator.toLocaleLowerCase()}`}>
          {operator}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
