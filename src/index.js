import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './styles/GlobalStyles';

ReactDOM.render(
  <BrowserRouter basename="/project-recipes-app">
    <GlobalStyle />
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
