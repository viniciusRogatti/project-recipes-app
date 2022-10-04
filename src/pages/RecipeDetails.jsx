import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import Ingredients from '../components/Ingredients';
import { AllRecipesAPI, RecipeDetalsAPI } from '../services/fetchApi';
import getIngredientsAndMeasures from '../services/getIngredientsAndMeasures';
import shareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';
import VideoRecipe from '../components/VideoRecipe';
import { DRINKS_PATH, MEALS_PATH, RECOMMENDED_LIMIT } from '../services/helpers/Consts';
import Carrousel from '../styles/carrousel';
import StartRecipeButton from '../styles/StartRecipeButton';
import {
  checkIsDoneRecipe,
  checkRecipeIsFavorited,
  getProgessesRecipes,
  removeRecipeToFavorite,
  saveRecipeToFavorite,
} from '../services/localStorage';
import Card from '../components/Card';

function RecipeDetails() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [ingredients, setIngredients] = useState(null);
  const [copiedLink, setcopiedLink] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recommended, setRecommended] = useState(null);

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
      setIsFavorite(checkRecipeIsFavorited(result[0], screen));
    };
    const fetchData = async () => {
      const path = screen === 'meals' ? DRINKS_PATH : MEALS_PATH;
      const data = await AllRecipesAPI(path);
      setRecommended(data[keyData]);
    };
    fetchData();
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

  const inProgress = Object.keys(getProgessesRecipes()[screen]).some((key) => key === id);
  const isDone = checkIsDoneRecipe(id);

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
      <button type="button" onClick={ () => history.goBack() }>
        Voltar
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
      <h4 data-testid="recipe-category">
        {screen === 'meals' ? detail.strCategory : detail.strAlcoholic}
      </h4>
      <h5> Ingredients </h5>
      {ingredients?.map((ingredient, index) => (
        <Ingredients
          ingredient={ ingredient }
          inProgress={ false }
          index={ index }
          key={ `id-ingredient${index}` }
          type={ screen }
        />
      ))}
      <h5> Instructions </h5>
      <p data-testid="instructions">{detail?.strInstructions}</p>
      {ingredients && screen === 'meals' && <VideoRecipe recipe={ detail } /> }
      <Carrousel>
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
      {!isDone && (
        <StartRecipeButton
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${pathname}/in-progress`) }
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe' }
        </StartRecipeButton>
      )}
    </section>
  );
}

export default RecipeDetails;
