// src/renderWithRouter.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { LOGIN_PATH } from '../services/helpers/Consts';

const renderWithRouter = (component, route = LOGIN_PATH) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};
export default renderWithRouter;
