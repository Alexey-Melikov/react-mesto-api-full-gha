import React, { useState } from "react";

function Login({ handleAuthorize }) {
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
    handleAuthorize(email, password);
  };

  return (
    <div className="auth">
      <form
        className="auth__form"
        name="register"
        id="register-form"
        onSubmit={handleSubmit}
      >
        <h2 className="auth__title">Вход</h2>
        <input
          className="auth__input"
          onChange={handleChange}
          name="email"
          placeholder="Email"
          type="email"
          //value={""} HERE
          id="auth-email-input"
        ></input>
        <input
          className="auth__input"
          onChange={handleChange}
          name="password"
          placeholder="Пароль"
          type="password"
          //value={""} HERE
          id="auth-password-input"
        ></input>
        <button className="auth__button" type="submit" id="auth-submit-button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
