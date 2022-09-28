import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import { AllRecipesAPI, RecipeDetalsAPI } from '../services/fetchApi';
import {
  DRINKS_PATH,
  MINUS_WATCH,
  PLUS_EMBED,
  RECOMMENDED_LIMIT,
} from '../services/helpers/Consts';
import Carrousel from '../styles/carrousel';
import RecommendedDrinkCards from './RecommendedDrinkCard';
import StartRecipeButton from '../styles/StartRecipeButton';
import { getProgessesRecipes, getRecipes } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';

function MealDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [details, setDetails] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [recipeDone, setRecipeDone] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState(false);
  const [copied, setcopied] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchDetails = async () => {
      const screen = pathname.includes('meals') && 'meals';
      const { meals } = getProgessesRecipes();
      setInProgressRecipes(Object.keys(meals).some((key) => key === id));
      const response = await RecipeDetalsAPI(pathname, id);
      const result = response[screen];
      setDetails(result);
    };
    fetchDetails();
  }, [id, pathname]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AllRecipesAPI(DRINKS_PATH);
      setRecommended(data.drinks);
    };
    fetchData();
    setRecipeDone(getRecipes());
  }, [pathname]);

  const shareLink1 = () => {
    copy(`http://localhost:3000${pathname}`);
    setcopied(true);
  };

  const getIngredientsAndMeasures = () => {
    if (details[0] !== undefined) {
      const ingredients = Object.entries(details[0])
        .filter((detaill) => detaill[0].includes('strIngredient'))
        .map((ingredient) => ingredient[1])
        .filter((ingredient) => ingredient !== null);
      const measures = Object.entries(details[0])
        .filter((detaill) => detaill[0].includes('strMeasure'))
        .map((ingredient) => ingredient[1])
        .filter((ingredient) => ingredient !== null);
      const concatTwoArrays = ingredients.map((info, index) => (
        `${measures[index]} ${info}`
      ));
      return concatTwoArrays;
    }
  };

  return (
    <section>
      { details.map((detail) => (
        <div key={ detail.idMeal }>
          <img
            alt={ detail.strMeal }
            src={ detail.strMealThumb }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{detail.strMeal}</h3>
          <h4 data-testid="recipe-category">{detail.strCategory}</h4>
          <h5>
            Ingredients
          </h5>
          {getIngredientsAndMeasures().map((result, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {result}
            </p>
          ))}
          <h5>
            Instructions
          </h5>
          <p data-testid="instructions">{detail.strInstructions}</p>
          <h5>
            Video
          </h5>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ detail.strYoutube.replace(MINUS_WATCH, PLUS_EMBED) }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {copied && <h3>Link copied!</h3>}
          <button
            type="button"
            data-testid="share-btn"
            onClick={ shareLink1 }
          >
            <img
              src={ shareIcon }
              alt="link video"
            />
          </button>

          <button
            data-testid="favorite-btn"
            type="button"
          >
            Adicionar aos Favoritos

          </button>
          <h5>
            Recommended
          </h5>
          <Carrousel>
            {recommended.map((drink, index) => (index < RECOMMENDED_LIMIT && (
              <RecommendedDrinkCards
                drink={ drink }
                index={ index }
                key={ drink.idDrink }
              />
            )))}
          </Carrousel>
          {!recipeDone.length ? (
            <StartRecipeButton
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`${pathname}/in-progress`) }
            >
              { inProgressRecipes ? 'Continue Recipe' : 'Start Recipe' }
            </StartRecipeButton>
          ) : recipeDone.map((recipe) => recipe.idMeal === id && (
            <StartRecipeButton
              onClick={ () => history.push(`${pathname}/in-progress`) }
              data-testid="start-recipe-btn"
            >
              { inProgressRecipes ? 'Continue Recipe' : 'Start Recipe' }
            </StartRecipeButton>
          ))}
        </div>
      ))}
    </section>
  );
}

export default MealDetails;
