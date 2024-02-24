import logo from "./logo.svg";
import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { BrowserRouter, Route, Link, Switch, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Adminloginscreen from "./screens/Adiminloginscreen";
import { useSelector } from "react-redux";
import Errorscreen from "./screens/Errorscreen";
import Cataloguescreen from "./screens/Cataloguescreen";
import SearchPage from "./screens/SearchPage";

function App() {
  const adminloginstate = useSelector((state) => state.adminloginReducer);
  const { currentAdmin } = adminloginstate;

  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Adminloginscreen />} />

          {currentAdmin ? (
            <Route
              path="/"
              exact
              element={<Cataloguescreen />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )},
          {currentAdmin ? (
            <Route
              path="/results"
              exact
              element={<SearchPage />}
            />
          ) : (
            <Route path="/error" exact element={<Errorscreen />} />
          )}

              </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
