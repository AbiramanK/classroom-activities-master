import { Link, Typography, TypographyProps } from "@mui/material";
import * as React from "react";

export interface ICopyrightProps {
  title?: string;
  date?: Date;
  link?: string;
  titleProps?: TypographyProps;
}

export default function Copyright(props: ICopyrightProps) {
  return (
    <React.Fragment>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ ...props?.titleProps }}
      >
        {"Copyright © "}
        <Link color="inherit" href="#">
          Classroom Activities
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </React.Fragment>
  );
}
