import React, { Component } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import AddMenuChart from "./components/add-menu-component";
import MenusList from "./components/menu-list.component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/menu"} className="navbar-brand">
            Emtec Lunch
          </Link>

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/menu"} className="nav-link">
                MenuChart
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addmenu"} className="nav-link">
                Add DayMenu
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/menu" element={MenusList} />
            <Route path="/addmenu" element={AddMenuChart} />
            <Route path="/daymenu/:day" element={""} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
