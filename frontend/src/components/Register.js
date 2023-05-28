import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    handleRegister(email, password);
  };

  return (
    <div className="auth">
      <form
        className="auth__form"
        onSubmit={handleSubmit}
        name="register"
        id="register-form"
      >
        <h2 className="auth__title">Регистрация</h2>
        <input
          className="auth__input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          type="email"
          value={formValue.email}
          id="auth-email-input"
        ></input>
        <input
          className="auth__input"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          type="password"
          value={formValue.password}
          id="auth-password-input"
        ></input>
        <button className="auth__button" type="submit" id="auth-submit-button">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="auth__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
export default Register;
