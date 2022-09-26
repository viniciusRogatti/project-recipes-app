import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Erro from './pages/Erro';
import {
  MEALS_PATH,
  LOGIN_PATH,
  DRINKS_PATH,
  PROFILE_PATH,
  FAVORITES_PATH,
  DONE_RECIPES_PATH,
  MEALS_RECIPES_PATH,
  DRINKS_RECIPES_PATH } from './services/helpers/Consts';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <RecipesProvider>
      <div>
        <Switch>
          <Route exact path={ LOGIN_PATH } component={ Login } />
          <Route exact path={ MEALS_PATH } component={ Meals } />
          <Route exact path={ DRINKS_PATH } component={ Drinks } />
          <Route exact path={ PROFILE_PATH } component={ Profile } />
          <Route exact path={ DONE_RECIPES_PATH } component={ DoneRecipes } />
          <Route exact path={ FAVORITES_PATH } component={ FavoriteRecipes } />
          <Route exact path={ MEALS_RECIPES_PATH } component={ Erro } />
          <Route exact path={ DRINKS_RECIPES_PATH } component={ Erro } />
        </Switch>
      </div>
    </RecipesProvider>
  );
}

export default App;
