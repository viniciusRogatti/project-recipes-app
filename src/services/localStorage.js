import {
  DONE_KEY,
  DRINKS_KEY,
  IN_PROGRESSES_RECIPES_KEY,
  MEALS_KEY,
  USER_KEY,
} from './helpers/Consts';

export const saveUser = (email) => {
  localStorage.setItem(USER_KEY, JSON.stringify(email));
  localStorage.setItem(MEALS_KEY, JSON.stringify(1));
  localStorage.setItem(DRINKS_KEY, JSON.stringify(1));
};

if (!JSON.parse(localStorage.getItem(DONE_KEY))) {
  localStorage.setItem(DONE_KEY, JSON.stringify([]));
}
const INITIAL_PROGRESSES = {
  drinks: {
  },
  meals: {
  },
};

if (!JSON.parse(localStorage.getItem(IN_PROGRESSES_RECIPES_KEY))) {
  localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(INITIAL_PROGRESSES));
}

export const saveProgressesRecipes = (obj, type) => {
  const allDrinks = JSON.parse(localStorage.getItem(IN_PROGRESSES_RECIPES_KEY)).drinks;
  const allMeals = JSON.parse(localStorage.getItem(IN_PROGRESSES_RECIPES_KEY)).meals;
  if (type === 'drinks') {
    const check = Object.keys(allDrinks).find((key) => key === obj.idDrink);
    if (!check) {
      const newObj = { drinks: { ...allDrinks, [obj.idDrink]: obj }, meals: allMeals };
      localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(newObj));
    }
  } else {
    const check = Object.keys(allDrinks).some((key) => key === obj.idMeal);
    if (!check) {
      const newObj = { meals: { ...allMeals, [obj.idMeal]: obj }, drinks: allDrinks };
      localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(newObj));
    }
  }
};

export const getProgessesRecipes = () => (
  JSON.parse(localStorage.getItem(IN_PROGRESSES_RECIPES_KEY)));

export const getRecipes = () => {
  const parse = JSON.parse(localStorage.getItem(DONE_KEY));
  return parse;
};

export default saveUser;
