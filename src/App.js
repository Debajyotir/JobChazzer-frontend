import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Result from "./pages/Result";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

export const server = "https://jobchaser-plfr.onrender.com";

function App() {
  const isAuth = useSelector(state=>state.login.token);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={isAuth ? <HomePage/> : <Navigate to="/auth" />} />
          <Route path={"/auth"} element={!isAuth ? <Register/> : <Navigate to="/" />} />
          <Route path={"/profile"} element={isAuth ? <Profile/> : <Navigate to="/auth" />} />
          <Route path={"/search"} element={isAuth ? <Result/> : <Navigate to="/auth" />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
