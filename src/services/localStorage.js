import { DONE_KEY, DRINKS_KEY, IN_PROGRESSES_RECIPES_KEY, MEALS_KEY,
  USER_KEY, FAVORITES_KEY, INITIAL_PROGRESSES } from './helpers/Consts';

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

export const saveProgressesRecipes = (id, ingredient, type) => {
  const rest = type === 'meals' ? 'drinks' : 'meals';
  const myFoods = JSON.parse(localStorage.getItem(IN_PROGRESSES_RECIPES_KEY))[type];
  const otherFoods = JSON.parse(localStorage.getItem(IN_PROGRESSES_RECIPES_KEY))[rest];
  const check = Object.keys(myFoods).some((key) => key === id);
  if (!check) {
    const newObj = { [type]: { ...myFoods, [id]: [ingredient] }, [rest]: otherFoods };
    localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(newObj));
  } else {
    const checkIngredient = myFoods[id].includes(ingredient);
    if (!checkIngredient) {
      const newObj = { [type]: { ...myFoods, [id]: [...myFoods[id], ingredient] },
        [rest]: otherFoods };
      localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(newObj));
    } else {
      const newObj = {
        [type]: { ...myFoods, [id]: myFoods[id].filter((e) => e !== ingredient) },
        [rest]: otherFoods };
      localStorage.setItem(IN_PROGRESSES_RECIPES_KEY, JSON.stringify(newObj));
    }
  }
};

export const getProgessesRecipes = () => JSON.parse(localStorage
  .getItem(IN_PROGRESSES_RECIPES_KEY));

// Funtions Done Recipes

export const getRecipes = () => JSON.parse(localStorage.getItem(DONE_KEY));

export const saveDoneRecipe = (recipe, type) => {
  const allRecipes = JSON.parse(localStorage.getItem(DONE_KEY));
  const data = new Date().toLocaleDateString('pt-br');
  const typeId = type === 'meals' ? 'idMeal' : 'idDrink';
  const name = type === 'meals' ? 'strMeal' : 'strDrink';
  const image = type === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const recipeType = type === 'meals' ? 'meal' : 'drink';
  const check = allRecipes.some((recip) => recip.id === recipe[typeId]);
  if (!check) {
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
    localStorage.setItem(DONE_KEY, JSON.stringify([...allRecipes, obj]));
  }
};

export const checkIsDoneRecipe = (idRecipe) => {
  const allRecipesDone = getRecipes();
  const teste = allRecipesDone.some((recipe) => recipe.id === idRecipe);
  return teste;
};

export const getFavoriteRecipes = () => JSON.parse(localStorage.getItem(FAVORITES_KEY));

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
  const allfavorites = getFavoriteRecipes();
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...allfavorites, obj]));
};

export const removeRecipeToFavorite = (recipe, type) => {
  const typeId = type === 'meals' ? 'idMeal' : 'idDrink';
  const allfavorites = getFavoriteRecipes();
  if (recipe.id) {
    const recipesFilter = allfavorites.filter((recip) => recip.id !== recipe.id);
    return localStorage.setItem(FAVORITES_KEY, JSON.stringify(recipesFilter));
  }
  if (recipe) {
    const recipesFilter = allfavorites.filter((recip) => recip.id !== recipe[typeId]);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(recipesFilter));
  }
};

export const checkRecipeIsFavorited = (recipe, type) => {
  const typeId = type === 'meals' ? 'idMeal' : 'idDrink';
  const allfavorites = getFavoriteRecipes();
  if (recipe) {
    const isFavorite = allfavorites.some((recip) => recip.id === recipe[typeId]);
    return isFavorite;
  }
};
