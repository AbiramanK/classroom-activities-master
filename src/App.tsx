import "./App.css";
import RootRouter from "./RootRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <RootRouter />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
