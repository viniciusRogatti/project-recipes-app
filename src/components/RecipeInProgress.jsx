import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import Ingredients from './Ingredients';
import { RecipeDetalsAPI } from '../services/fetchApi';
import getIngredientsAndMeasures from '../services/getIngredientsAndMeasures';
import shareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';
import VideoRecipe from './VideoRecipe';
import StartRecipeButton from '../styles/StartRecipeButton';
import {
  checkRecipeIsFavorited,
  getProgessesRecipes,
  removeRecipeToFavorite,
  saveRecipeToFavorite,
} from '../services/localStorage';
import useRecipes from '../hooks/useRecipes';
import { DONE_RECIPES_PATH } from '../services/helpers/Consts';

function RecipeInProgress() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [ingredients, setIngredients] = useState(null);
  const [copiedLink, setcopiedLink] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipeFinished, setrecipeFinished] = useState(false);
  const { recipesMade } = useRecipes();

  const screen = pathname.includes('meals') ? 'meals' : 'drinks';
  const cardImg = pathname.includes('meals') ? 'strMealThumb' : 'strDrinkThumb';
  const cardName = pathname.includes('meals') ? 'strMeal' : 'strDrink';

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await RecipeDetalsAPI(pathname, id);
      const result = response[screen];
      setDetail(result[0]);
      setIngredients(getIngredientsAndMeasures(result[0]));
      setIsFavorite(checkRecipeIsFavorited(result[0], screen));
    };
    fetchDetails();
  }, []); // eslint-disable-line

  useEffect(() => {
    const recipesInProgress = getProgessesRecipes()[screen][id]?.length;
    if (recipesInProgress) setrecipeFinished(recipesInProgress === ingredients?.length);
  }, [ingredients]); // eslint-disable-line

  useEffect(() => {
    setrecipeFinished(recipesMade === ingredients?.length);
  }, [recipesMade]); // eslint-disable-line

  const shareLink = () => {
    copy(`http://localhost:3000/${screen}/${id}`);
    setcopiedLink(true);
  };

  const handlefavorited = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      saveRecipeToFavorite(detail, screen);
    } else removeRecipeToFavorite(detail, screen);
  };

  return (
    <section>
      <button
        type="button"
        onClick={ handlefavorited }
        data-testid="favorite-btn"
        src={ isFavorite ? FavoriteIcon : notFavoriteIcon }
      >
        Favoritar
      </button>
      {copiedLink && <h3>Link copied!</h3>}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ shareLink }
      >
        <img src={ shareIcon } alt="link video" />
      </button>
      <img alt={ detail[cardName] } src={ detail[cardImg] } data-testid="recipe-photo" />
      <h3 data-testid="recipe-title">{detail[cardName]}</h3>
      <h4 data-testid="recipe-category">{detail.strCategory}</h4>
      <h5> Ingredients </h5>
      {ingredients?.map((ingredient, index) => (
        <Ingredients
          ingredient={ ingredient }
          inProgress
          index={ index }
          key={ `id-ingredient${index}` }
        />
      ))}
      <h5> Instructions </h5>
      <p data-testid="instructions">{detail.strInstructions}</p>
      {ingredients && screen === 'meals' && <VideoRecipe recipe={ detail } /> }
      <StartRecipeButton
        data-testid="finish-recipe-btn"
        disabled={ !recipeFinished }
        onClick={ () => history.push(DONE_RECIPES_PATH) }
      >
        Finish Recipe
      </StartRecipeButton>
    </section>
  );
}

export default RecipeInProgress;
