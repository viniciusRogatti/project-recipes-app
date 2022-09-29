import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import Ingredientes from './Ingredientes';
import { RecipeDetalsAPI } from '../services/fetchApi';
import getIngredientsAndMeasures from '../services/getIngredientsAndMeasures';
import shareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';
import VideoRecipe from './VideoRecipe';
import StartRecipeButton from '../styles/StartRecipeButton';
import {
  checkRecipeIsFavorited,
} from '../services/localStorage';

function RecipeInProgress() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [ingredients, setIngredients] = useState(null);
  const [copiedLink, setcopiedLink] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const shareLink = () => {
    copy(`http://localhost:3000${pathname}`);
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
        <Ingredientes
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
      >
        Finish Recipe
      </StartRecipeButton>
    </section>
  );
}

export default RecipeInProgress;
