import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { fakeAuthProvider } from "./auth";
import { AuthenticationOutput } from "./graphql-codegen/graphql";
import { Dashboard, SignInSide, SignUpSide } from "./screens";

export default function RootRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route>
          <Route path="/signin" element={<SignInSide />} />
          <Route path="/signup" element={<SignUpSide />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

interface AuthContextType {
  user: any;
  signin: (user: AuthenticationOutput, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<AuthenticationOutput | null>(null);

  let localUser = localStorage.getItem("user")! ?? "";

  if (localUser.trim() !== "" && user === null) {
    const userObj = JSON.parse(localUser);
    setUser(userObj);
  }

  let signin = (newUser: AuthenticationOutput, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      localStorage.clear();
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
