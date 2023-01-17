import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './styles/GlobalStyles';

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyle basename="/project-recipes-app" />
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
