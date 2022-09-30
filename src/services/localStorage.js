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

export const saveProgressesRecipesMeals = (id, ingredient) => {
  const allDrinks = JSON.parse(localStorage.getItem(IN_PROGRESSES_RECIPES_KEY)).drinks;
  const allMeals = JSON.parse(localStorage.getItem(IN_PROGRESSES_RECIPES_KEY)).meals;
  const check = Object.keys(allMeals).some((key) => key === id);
  if (!check) {
    const newObj = { meals: { ...allMeals, [id]: [ingredient] }, drinks: allDrinks };
    localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(newObj));
  } else {
    const checkIngredient = allMeals[id].includes(ingredient);
    if (!checkIngredient) {
      const newObj = { meals: { ...allMeals, [id]: [...allMeals[id], ingredient] },
        drinks: allDrinks };
      localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(newObj));
    } else {
      const newObj = {
        meals: { ...allMeals, [id]: allMeals[id].filter((e) => e !== ingredient) },
        drinks: allDrinks };
      localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(newObj));
    }
  }
};

export const saveProgressesRecipesDrinks = (id, ingredient) => {
  const allDrinks = JSON.parse(localStorage.getItem(IN_PROGRESSES_RECIPES_KEY)).drinks;
  const allMeals = JSON.parse(localStorage.getItem(IN_PROGRESSES_RECIPES_KEY)).meals;
  const check = Object.keys(allDrinks).some((key) => key === id);
  if (!check) {
    const newObj = { drinks: { ...allDrinks, [id]: [ingredient] }, meals: allMeals };
    localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(newObj));
  } else {
    const checkIngredient = allDrinks[id].includes(ingredient);
    if (!checkIngredient) {
      const newObj = { drinks: { ...allDrinks, [id]: [...allDrinks[id], ingredient] },
        meals: allMeals };
      localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(newObj));
    } else {
      const newObj = {
        drinks: { ...allDrinks, [id]: allDrinks[id].filter((e) => e !== ingredient) },
        meals: allMeals };
      localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(newObj));
    }
  }
};

export const getProgessesRecipes = () => JSON.parse(localStorage
  .getItem(IN_PROGRESSES_RECIPES_KEY));

// Funtions Done Recipes

export const getRecipes = () => JSON.parse(localStorage.getItem(DONE_KEY));

export const saveDoneRecipe = (recipe, type) => {
  const data = new Date().toLocaleDateString('pt-br');
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
    doneDate: data,
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  };
  const allRecipes = JSON.parse(localStorage.getItem(DONE_KEY));
  localStorage.setItem(DONE_KEY, JSON.stringify([...allRecipes, obj]));
};

export const checkIsDoneRecipe = (idRecipe) => {
  const allRecipesDone = getRecipes();
  const teste = allRecipesDone.some((recipe) => recipe.id === idRecipe);
  return teste;
};

// Funtions Recipes Favorite \/

export const saveRecipeToFavorite = (recipe, type) => {
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
