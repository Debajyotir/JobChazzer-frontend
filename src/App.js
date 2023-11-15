import Register from "./pages/Register";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={"/"} element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
