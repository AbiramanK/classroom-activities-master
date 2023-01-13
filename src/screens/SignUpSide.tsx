import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { LoadingButton } from "@mui/lab";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../RootRouter";
import { Copyright } from "../components";
import { useRegisterMutation } from "../graphql-codegen/graphql";
import { useSnackbar } from "notistack";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const theme = createTheme();

export default function SignUpSide() {
  const [register, { data, loading, error }] = useRegisterMutation();

  let { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const [designation, setDesignation] = React.useState("");

  const handleDesignationChange = (event: SelectChangeEvent) => {
    setDesignation(event.target.value as string);
  };

  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let firstName = formData?.get("firstName") as string;
    let lastName = formData?.get("lastName") as string;
    let email = formData?.get("email") as string;
    let password = formData?.get("password") as string;
    let designation = formData?.get("designation") as string;

    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      designation.trim() !== ""
    ) {
      register({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
            type: designation,
          },
        },
      });
    } else {
      enqueueSnackbar("Please fill all the required fields", {
        variant: "info",
      });
    }
  };

  if (error) {
    enqueueSnackbar(error?.message, { variant: "error" });
  }

  if (data! && !auth?.user) {
    enqueueSnackbar("User registered successfully", { variant: "success" });
    auth.signin(data!?.register!, () => {
      navigate(from, { replace: true });
    });
  }

  if (data?.register!) {
    auth.signin(data?.register!, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", overflowY: "scroll" }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="designation-label">
                      Designnation *
                    </InputLabel>
                    <Select
                      required
                      labelId="designation-label"
                      id="designation"
                      value={designation}
                      label="Designation"
                      name="designation"
                      onChange={handleDesignationChange}
                    >
                      <MenuItem value={"master"}>Master</MenuItem>
                      <MenuItem value={"student"}>Student</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                <span>Sign Up</span>
              </LoadingButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright titleProps={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
