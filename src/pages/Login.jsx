import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import saveUser from '../services/localStorage';
import {
  BoxLogin,
  BoxLogo,
  Container,
  LoginTitle,
  LogoTomate,
  LogoApp,
  ButtonLogin,
  InputLogin,
} from '../styles/login';

import {
  EMAIL_INPUT_TESTID,
  LOGIN_BUTTON_TESTID,
  MEALS_PATH,
  MIN_CHARACTERS,
  PASSWORD_INPUT_TESTID,
} from '../services/helpers/Consts';

function Login() {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const onInputChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const validateLogin = () => {
    const checkEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(state.email);
    return !(checkEmail && state.password.length >= MIN_CHARACTERS);
  };

  const handleEnter = () => {
    const savedEmail = {
      email: state.email,
    };
    saveUser(savedEmail);
    history.push(MEALS_PATH);
  };

  return (
    <Container>
      <BoxLogo>
        <LogoApp />
        <LogoTomate />
      </BoxLogo>
      <BoxLogin>
        <LoginTitle>
          Login
        </LoginTitle>
        <InputLogin
          type="email"
          name="email"
          id="email"
          data-testid={ EMAIL_INPUT_TESTID }
          value={ state.email }
          onChange={ onInputChange }
          placeholder="Email"
        />
        <InputLogin
          type="password"
          name="password"
          id="password"
          data-testid={ PASSWORD_INPUT_TESTID }
          value={ state.password }
          onChange={ onInputChange }
          placeholder="Password"
        />
        <ButtonLogin
          type="button"
          data-testid={ LOGIN_BUTTON_TESTID }
          disabled={ validateLogin() }
          onClick={ handleEnter }
        >
          Enter
        </ButtonLogin>
      </BoxLogin>
    </Container>
  );
}

export default Login;
