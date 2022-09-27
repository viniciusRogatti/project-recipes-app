import {
  DONE_KEY,
  DRINKS_KEY,
  MEALS_KEY,
  USER_KEY,
} from './helpers/Consts';

export const saveUser = (email) => {
  localStorage.setItem(USER_KEY, JSON.stringify(email));
  localStorage.setItem(MEALS_KEY, JSON.stringify(1));
  localStorage.setItem(DRINKS_KEY, JSON.stringify(1));
};

export const getRecipes = () => {
  const parse = JSON.parse(localStorage.getItem(DONE_KEY));
  if (parse === null) return [];
  return parse;
};

export default saveUser;
