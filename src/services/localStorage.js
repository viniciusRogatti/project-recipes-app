import {
  DRINKS_KEY,
  MEALS_KEY,
  USER_KEY,
} from '../tests/helpers/Consts';

const saveUser = (email) => {
  localStorage.setItem(USER_KEY, JSON.stringify(email));
  localStorage.setItem(MEALS_KEY, JSON.stringify(1));
  localStorage.setItem(DRINKS_KEY, JSON.stringify(1));
};

export default saveUser;
