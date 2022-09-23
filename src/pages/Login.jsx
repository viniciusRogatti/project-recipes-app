import React, { useState } from 'react';
import {
  EMAIL_INPUT_TESTID,
  LOGIN_BUTTON_TESTID,
  PASSWORD_INPUT_TESTID,
} from '../tests/helpers/Consts';

function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const onInputChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const validateLogin = () => {
    const MIN_CHARACTERS = 6;
    const checkEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(state.email);
    return !(checkEmail && state.password.length >= MIN_CHARACTERS);
  };

  console.log(validateLogin());

  return (
    <form>
      <label htmlFor="email">
        <span>Email: </span>
        <input
          type="email"
          name="email"
          id="email"
          data-testid={ EMAIL_INPUT_TESTID }
          value={ state.email }
          onChange={ onInputChange }
        />
      </label>
      <label htmlFor="password">
        <span>Password: </span>
        <input
          type="password"
          name="password"
          id="password"
          data-testid={ PASSWORD_INPUT_TESTID }
          value={ state.password }
          onChange={ onInputChange }
        />
      </label>
      <button
        type="button"
        data-testid={ LOGIN_BUTTON_TESTID }
        disabled={ validateLogin() }
        // onClick={ handleEnter }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
