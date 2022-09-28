import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import Carrousel from '../styles/carrousel';
import FavoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';
import StartRecipeButton from '../styles/StartRecipeButton';
import RecommendedMealCards from './RecommendedMealCards';
import {
  AllRecipesAPI,
  RecipeDetalsAPI } from '../services/fetchApi';
import {
  MEALS_PATH,
  RECOMMENDED_LIMIT } from '../services/helpers/Consts';
import {
  getProgessesRecipes,
  getRecipes,
  saveRecipeToFavorite } from '../services/localStorage';

function DrinkDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [details, setDetails] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [recipeDone, setRecipeDone] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState(false);
  const [copied, setcopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchDetails = async () => {
      const screen = pathname.includes('drinks') && 'drinks';
      const { drinks } = getProgessesRecipes();
      setInProgressRecipes(Object.keys(drinks).some((key) => key === id));
      const response = await RecipeDetalsAPI(pathname, id);
      const result = response[screen];
      setDetails(result);
    };
    fetchDetails();
  }, [id, pathname]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AllRecipesAPI(MEALS_PATH);
      setRecommended(data.meals);
    };
    fetchData();
    setRecipeDone(getRecipes());
  }, [pathname]);

  const shareLink = () => {
    copy(`http://localhost:3000${pathname}`);
    setcopied(true);
  };

  const handlefavorited = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      saveRecipeToFavorite(details[0], 'drink');
    } else console.log('teste');
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
      {
        details.map((detail) => (
          <div key={ detail.idDrink }>
            <img
              alt={ detail.strDrink }
              src={ detail.strDrinkThumb }
              data-testid="recipe-photo"
            />
            <h3 data-testid="recipe-title">{detail.strDrink}</h3>
            <h4 data-testid="recipe-category">{detail.strAlcoholic}</h4>
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
            <button type="button" onClick={ handlefavorited } data-testid="favorite-btn">
              { isFavorite ? (
                <img
                  alt="favoriteIcon"
                  src={ FavoriteIcon }
                />
              ) : (
                <img
                  alt="notFavoriteIcon"
                  src={ notFavoriteIcon }
                />)}
            </button>
            {copied && <h3>Link copied!</h3>}
            <button
              type="button"
              data-testid="share-btn"
              onClick={ shareLink }
            >
              <img
                src={ shareIcon }
                alt="link video"
              />
            </button>
            <h5>
              Recommended
            </h5>
            <Carrousel>
              {recommended.map((meal, index) => (index < RECOMMENDED_LIMIT && (
                <RecommendedMealCards
                  meal={ meal }
                  index={ index }
                  key={ meal.idMeal }
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
            ) : recipeDone.map((recipe) => recipe.idDrink === id && (
              <StartRecipeButton
                data-testid="start-recipe-btn"
                onClick={ () => history.push(`${pathname}/in-progress`) }
              >
                { inProgressRecipes ? 'Continue Recipe' : 'Start Recipe' }
              </StartRecipeButton>
            ))}
          </div>
        ))
      }
    </section>
  );
}

export default DrinkDetails;
