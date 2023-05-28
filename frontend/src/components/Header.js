import { Route } from "react-router-dom";
import logo from "../images/logo/header-logo.svg";
import React from "react";
import { Link, Routes } from "react-router-dom";

function Header({ headerEmail, handleSignOut }) {

  function onSignOut() {
    handleSignOut()
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Надпись 'Место" />

      <Routes>
        <Route
          path="*"
          element={
            <div className="header__container">
              <span className="header__auth-email">{headerEmail}</span>
              <button className="header__auth-button" onClick={onSignOut}>Выйти</button>
            </div>
          }
        ></Route>

        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__auth-button">
              Регистрация
            </Link>
          }
        ></Route>

        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__auth-button">
              Войти
            </Link>
          }
        ></Route>
      </Routes>
    </header>
  );
}

export default Header;
