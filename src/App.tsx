import "./App.css";
import RootRouter from "./RootRouter";
import { Dashboard } from "./screens";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <RootRouter />
    </Router>
  );
}

export default App;
