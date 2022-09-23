import { INGREDIENT_VALUE, NAME_VALUE } from '../tests/helpers/Consts';

const TheMealDBAPI = async (endPoint, value) => {
  let URL;
  switch (endPoint) {
  case INGREDIENT_VALUE:
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
    break;
  case NAME_VALUE:
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    break;
  default:
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
    break;
  }
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default TheMealDBAPI;
