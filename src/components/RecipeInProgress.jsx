import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Ingredients from './Ingredients';
import { RecipeDetalsAPI } from '../services/fetchApi';
import getIngredientsAndMeasures from '../services/getIngredientsAndMeasures';
import VideoRecipe from './VideoRecipe';
import StartRecipeButton from '../styles/StartRecipeButton';
import { getProgessesRecipes, saveDoneRecipe } from '../services/localStorage';
import useRecipes from '../hooks/useRecipes';
import { DONE_RECIPES_PATH } from '../services/helpers/Consts';
import { BoxHeader,
  BoxIcons, BoxImage, BoxIngredient,
  BoxInstructions, Container, ContainerIcons, Main } from '../styles/recipes';
import { ChevronLeftIcon } from '../styles/_icons';
import ShareAnimation from './LottieAnimations/ShareAnimation';
import LikeAnimation from './LottieAnimations/LikeAnimation';

function RecipeInProgress() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [ingredients, setIngredients] = useState(null);
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

  const handleDone = () => {
    saveDoneRecipe(detail, screen);
    history.push(DONE_RECIPES_PATH);
  };

  const allIngredientsFinished = getProgessesRecipes()[screen][id];

  return (
    detail && (
      <Main>
        <BoxHeader>
          <ChevronLeftIcon margin="20%" onClick={ () => history.goBack() } />
          <h3 data-testid="recipe-title">{detail[cardName]}</h3>
          <h4 data-testid="recipe-category">
            {screen === 'meals' ? detail.strCategory : detail.strAlcoholic}
          </h4>
          <BoxImage banner={ detail[cardImg] } />
        </BoxHeader>
        <Container>
          <ContainerIcons>
            <BoxIcons>
              <span> Copy Link </span>
              <ShareAnimation
                pathname={ pathname }
              />
            </BoxIcons>
            <BoxIcons>
              <span> Favorite </span>
              <LikeAnimation
                detail={ detail }
                type={ screen }
                className="like-header"
              />
            </BoxIcons>
          </ContainerIcons>
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
