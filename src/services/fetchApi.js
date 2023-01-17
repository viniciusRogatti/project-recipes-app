import {
  ALERT_FIRSTLETTER_INVALID,
  DRINKS_ENDPOINT,
  FIRST_LETTER_VALUE,
  INGREDIENT_VALUE,
  MEALS_ENDPOINT,
  MEALS_PATH,
  NAME_VALUE,
} from './helpers/Consts';

export const dynamicsUrl = (type, search, value) => {
  const dynamicHost = type === MEALS_PATH ? MEALS_ENDPOINT : DRINKS_ENDPOINT;
  switch (search) {
  case INGREDIENT_VALUE:
    return `https://${dynamicHost}/api/json/v1/1/filter.php?i=${value}`;
  case NAME_VALUE:
    return `https://${dynamicHost}/api/json/v1/1/search.php?s=${value}`;
  default:
    return `https://${dynamicHost}/api/json/v1/1/search.php?f=${value}`;
  }
};

export const TheRecipesDBAPI = async (type, search, value) => {
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
  const dynamicHost = path === MEALS_PATH ? MEALS_ENDPOINT : DRINKS_ENDPOINT;
  const URL = `https://${dynamicHost}/api/json/v1/1/search.php?s=`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const fetchAllCategories = async (path) => {
  const dynamicHost = path === MEALS_PATH ? MEALS_ENDPOINT : DRINKS_ENDPOINT;
  const URL = `https://${dynamicHost}/api/json/v1/1/list.php?c=list`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const fetchCategory = async (path, value) => {
  const dynamicHost = path === MEALS_PATH ? MEALS_ENDPOINT : DRINKS_ENDPOINT;
  const URL = `https://${dynamicHost}/api/json/v1/1/filter.php?c=${value}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const RecipeDetalsAPI = async (path, id) => {
  const dynamicHost = path.includes('meals') ? MEALS_ENDPOINT : DRINKS_ENDPOINT;
  const URL = `https://${dynamicHost}/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
