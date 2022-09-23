import React from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="email">
        <span>Email: </span>
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        <span>Password: </span>
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
