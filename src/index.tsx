import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GRAPHQL_API } from "./constants";
import {
  AuthenticationOutput,
  PaginationOutput,
} from "./graphql-codegen/graphql";

const httpLink = createHttpLink({
  uri: GRAPHQL_API,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const user = localStorage.getItem("user")! ?? "";
  // return the headers to the context so httpLink can read them
  if (user.trim() !== "") {
    let userObj: AuthenticationOutput = JSON.parse(user);
    let token = userObj?.token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }

  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          get_calculations: {
            keyArgs: false,
            merge(existing: PaginationOutput, incoming: PaginationOutput) {
              const incomingEdgeds = incoming?.edgeds!;
              const existingEdgeds = existing?.edgeds!;
              const latest = {
                ...incoming,
                edgeds: [...(existingEdgeds ?? []), ...incomingEdgeds],
              };
              return latest;
            },
          },
        },
      },
    },
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
