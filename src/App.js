import { HashRouter } from "react-router-dom";
import { Home } from "./pages";
import "./tailwind.css";

function App() {
  return (
    <HashRouter>
      <Home />
    </HashRouter>
  );
}

export default App;
