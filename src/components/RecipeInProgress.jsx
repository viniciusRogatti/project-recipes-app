import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import Ingredients from './Ingredients';
import { RecipeDetalsAPI } from '../services/fetchApi';
import getIngredientsAndMeasures from '../services/getIngredientsAndMeasures';
import VideoRecipe from './VideoRecipe';
import StartRecipeButton from '../styles/StartRecipeButton';
import {
  checkRecipeIsFavorited,
  getProgessesRecipes,
  removeRecipeToFavorite,
  saveDoneRecipe,
  saveRecipeToFavorite,
} from '../services/localStorage';
import useRecipes from '../hooks/useRecipes';
import { DONE_RECIPES_PATH } from '../services/helpers/Consts';
import { BoxHeader,
  BoxIcons, BoxImage,
  BoxIngredient, BoxInstructions, Container, Main } from '../styles/recipes';
import { ChevronLeftIcon, DesLikeIcon, LikeIcon, ShareIcon } from '../styles/_icons';

function RecipeInProgress() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  // const [copiedLink, setcopiedLink] = useState(false);
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
    if (recipesInProgress) {
      setrecipeFinished(recipesInProgress === ingredients?.length);
    }
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

  const handleDone = () => {
    saveDoneRecipe(detail, screen);
    history.push(DONE_RECIPES_PATH);
  };

  const allIngredientsFinished = getProgessesRecipes()[screen][id];

  return (
    detail && (
      <Main>
        <BoxHeader>
          <BoxIcons>
            <ChevronLeftIcon margin="80%" onClick={ () => history.goBack() } />
            <ShareIcon
              data-testid="share-btn"
              onClick={ shareLink }
            />
            { isFavorite ? (
              <DesLikeIcon
                onClick={ handlefavorited }
                data-testid="favorite-btn"
              />
            ) : (
              <LikeIcon
                onClick={ handlefavorited }
                data-testid="favorite-btn"
              />
            )}
          </BoxIcons>
          <h3 data-testid="recipe-title">{detail[cardName]}</h3>
          <h4 data-testid="recipe-category">
            {screen === 'meals' ? detail.strCategory : detail.strAlcoholic}
          </h4>
          <BoxImage banner={ detail[cardImg] } />
        </BoxHeader>
        <Container>
          <h1> Ingredients </h1>
          <BoxIngredient>
            {ingredients?.map((ingredient, index) => (
              <Ingredients
                ingredient={ ingredient }
                inProgress
                index={ index }
                key={ `id-ingredient${index}` }
                isChecked={ allIngredientsFinished?.includes(ingredient) }
              />
            ))}
          </BoxIngredient>
          <h1> Instructions </h1>
          <BoxInstructions>
            <p data-testid="instructions">{detail.strInstructions}</p>
          </BoxInstructions>

          {ingredients && screen === 'meals' && <VideoRecipe recipe={ detail } /> }
        </Container>
        <StartRecipeButton
          data-testid="finish-recipe-btn"
          disabled={ !recipeFinished }
          onClick={ handleDone }
        >
          Finish Recipe
        </StartRecipeButton>
      </Main>
    )
  );
}

export default RecipeInProgress;
