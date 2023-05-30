import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import './index.css';
import { Routes, Route, Link } from "react-router-dom";

import TrailersList from "./components/trailers-list.component.js";
import Videos from "./components/video.component";
import Perfil from "./Perfil";
import Login from "./Google-Login/Login";


class App extends Component {
  render() {
    const user = localStorage.getItem('user');
    const logout = () => {
      localStorage.clear()
      window.location.reload()
    }
    return (
      <div class="center">
        <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-center">
          <a href="/perfil" className="navbar-brand">
            Itzel Rios
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/trailers"} className="nav-link">
                Trailers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-link">
              {user &&
                <li>
                  <Link onClick={logout} to={"/home"}>Cerrar Sesion</Link>
                </li>
              }</li>
          </div>
        </nav>

        <div className="center w85">
          <h2 className="justify-content-center">Proyecto de Trailers de peliculas   </h2>
          <div className="ph3 pv1 background-gray">

            <Routes>
              <Route exact path="/trailers" element={<TrailersList />} />
              <Route exact path="add" element={<Login />} />
              <Route exact path="/video" element={<Videos />} />
              <Route exact path="/perfil" element={<Perfil />} />

            </Routes>
          </div>
        </div>
      </div>

    );
  }
}

export default App;