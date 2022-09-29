import {
  DONE_KEY,
  DRINKS_KEY,
  IN_PROGRESSES_RECIPES_KEY,
  MEALS_KEY,
  USER_KEY,
  FAVORITES_KEY,
  INITIAL_PROGRESSES,
} from './helpers/Consts';

export const saveUser = (email) => {
  localStorage.setItem(USER_KEY, JSON.stringify(email));
  localStorage.setItem(MEALS_KEY, JSON.stringify(1));
  localStorage.setItem(DRINKS_KEY, JSON.stringify(1));
};

if (!JSON.parse(localStorage.getItem(DONE_KEY))) {
  localStorage.setItem(DONE_KEY, JSON.stringify([]));
}
if (!JSON.parse(localStorage.getItem(IN_PROGRESSES_RECIPES_KEY))) {
  localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(INITIAL_PROGRESSES));
}
if (!JSON.parse(localStorage.getItem(FAVORITES_KEY))) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
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

export const getProgessesRecipes = () => JSON.parse(localStorage
  .getItem(IN_PROGRESSES_RECIPES_KEY));

export const getRecipes = () => JSON.parse(localStorage.getItem(DONE_KEY));

export const checkIsDoneRecipe = (idRecipe) => {
  const allRecipesDone = getRecipes();
  const teste = allRecipesDone.some((recipe) => recipe.id === idRecipe);
  return teste;
};

export const saveRecipeToFavorite = (recipe, type) => {
  console.log(recipe, type);
  const typeId = type === 'meals' ? 'idMeal' : 'idDrink';
  const name = type === 'meals' ? 'strMeal' : 'strDrink';
  const image = type === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const recipeType = type === 'meals' ? 'meal' : 'drink';
  const obj = {
    id: recipe[typeId],
    type: recipeType,
    nationality: recipe.strArea ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    name: recipe[name],
    image: recipe[image],
  };
  const allRecipes = JSON.parse(localStorage.getItem(FAVORITES_KEY));
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...allRecipes, obj]));
};

export const removeRecipeToFavorite = (recipe, type) => {
  const typeId = type === 'meals' ? 'idMeal' : 'idDrink';
  if (recipe) {
    const allRecipes = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    const recipesFilter = allRecipes.filter((recip) => recip.id !== recipe[typeId]);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(recipesFilter));
  }
};

export const checkRecipeIsFavorited = (recipe, type) => {
  const typeId = type === 'meals' ? 'idMeal' : 'idDrink';
  const allRecipes = JSON.parse(localStorage.getItem(FAVORITES_KEY));
  if (recipe) {
    const isFavorite = allRecipes.some((recip) => recip.id === recipe[typeId]);
    return isFavorite;
  }
};
