import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Ingredients from '../components/Ingredients';
import { AllRecipesAPI, RecipeDetalsAPI } from '../services/fetchApi';
import getIngredientsAndMeasures from '../services/getIngredientsAndMeasures';
import VideoRecipe from '../components/VideoRecipe';
import { DONE_RECIPES_PATH,
  DRINKS_PATH, MEALS_PATH, RECOMMENDED_LIMIT } from '../services/helpers/Consts';
import Carrousel from '../styles/carrousel';
import StartRecipeButton from '../styles/StartRecipeButton';
import {
  checkIsDoneRecipe,
  getProgessesRecipes,
} from '../services/localStorage';
import Card from '../components/Card';
import { BoxCarrousel, BoxHeader,
  BoxIcons, BoxImage, BoxIngredient, BoxInstructions,
  Container, ContainerIcons, Main } from '../styles/recipes';
import { ChevronLeftIcon } from '../styles/_icons';
import LikeAnimation from '../components/LottieAnimations/LikeAnimation';
import ShareAnimation from '../components/LottieAnimations/ShareAnimation';

function RecipeDetails() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [ingredients, setIngredients] = useState(null);
  const [recommended, setRecommended] = useState(null);
  const carrousel = useRef(null);

  const screen = pathname.includes('meals') ? 'meals' : 'drinks';
  const cardImg = pathname.includes('meals') ? 'strMealThumb' : 'strDrinkThumb';
  const cardName = pathname.includes('meals') ? 'strMeal' : 'strDrink';
  const keyData = pathname.includes('meals') ? 'drinks' : 'meals';

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await RecipeDetalsAPI(pathname, id);
      const result = response[screen];
      setDetail(result[0]);
      setIngredients(getIngredientsAndMeasures(result[0]));
    };
    const fetchData = async () => {
      const path = screen === 'meals' ? DRINKS_PATH : MEALS_PATH;
      const data = await AllRecipesAPI(path);
      setRecommended(data[keyData]);
    };
    fetchData();
    fetchDetails();
  }, [pathname]); // eslint-disable-line

  const handleLeftClick = () => {
    const screenCarrousel = 11;
    carrousel.current.scrollLeft -= (carrousel.current.offsetWidth + screenCarrousel);
  };

  const handleRightClick = () => {
    const screenCarrousel = 11;
    carrousel.current.scrollLeft += (carrousel.current.offsetWidth + screenCarrousel);
  };

  const inProgress = Object.keys(getProgessesRecipes()[screen]).some((key) => key === id);
  const isDone = checkIsDoneRecipe(id);

  return (
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
              inProgress={ false }
              index={ index }
              key={ `id-ingredient${index}` }
              type={ screen }
            />
          ))}
        </BoxIngredient>
        <h1> Instructions </h1>
        <BoxInstructions>
          <p data-testid="instructions">{detail?.strInstructions}</p>
        </BoxInstructions>
        {ingredients && screen === 'meals' && <VideoRecipe recipe={ detail } /> }
        <BoxCarrousel>
          <Carrousel ref={ carrousel }>
            {recommended?.map((recipe, index) => (index < RECOMMENDED_LIMIT && (
              <Card
                recipe={ recipe }
                key={ `${index}-recommendation-card` }
                titleTestId={ `${index}-recommendation-card` }
                imgTestId={ `${index}-card-img` }
                nameTestId={ `${index}-recommendation-title` }
                type={ screen === 'meals' ? 'drinks' : 'meals' }
              />
            )))}
          </Carrousel>
          <ChevronLeftIcon onClick={ handleLeftClick } className="chevron-left" />
          <ChevronLeftIcon onClick={ handleRightClick } className="chevron-right" />
        </BoxCarrousel>
      </Container>
      {!isDone ? (
        <StartRecipeButton
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${pathname}/in-progress`) }
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe' }
        </StartRecipeButton>
      ) : (
        <StartRecipeButton
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${DONE_RECIPES_PATH}`) }
        >
          Done Recipes
        </StartRecipeButton>
      )}
    </Main>
  );
}

export default RecipeDetails;
