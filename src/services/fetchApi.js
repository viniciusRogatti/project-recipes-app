import {
  ALERT_FIRSTLETTER_INVALID,
  FIRST_LETTER_VALUE,
  INGREDIENT_VALUE,
  MEALS_PATH,
  NAME_VALUE,
} from './helpers/Consts';

export const dynamicsUrl = (type, search, value) => {
  const dynamicHost = type === MEALS_PATH ? 'www.themealdb.com' : 'www.thecocktaildb.com';
  switch (search) {
  case INGREDIENT_VALUE:
    return `https://${dynamicHost}/api/json/v1/1/filter.php?i=${value}`;
  case NAME_VALUE:
    return `https://${dynamicHost}/api/json/v1/1/search.php?s=${value}`;
  default:
    return `https://${dynamicHost}/api/json/v1/1/search.php?f=${value}`;
  }
};

const TheRecipesDBAPI = async (type, search, value) => {
  const URL = dynamicsUrl(type, search, value);
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return search === FIRST_LETTER_VALUE ? global.alert(ALERT_FIRSTLETTER_INVALID) : err;
  }
};
export const AllRecipesAPI = async (path) => {
  const dynamicHost = path === MEALS_PATH ? 'www.themealdb.com' : 'www.thecocktaildb.com';
  const URL = `https://${dynamicHost}/api/json/v1/1/search.php?s=`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export default TheRecipesDBAPI;
