import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';
import {
  MINUS_WATCH,
  PLUS_EMBED,
} from '../services/helpers/Consts';
import {
  checkRecipeIsFavorited,
  removeRecipeToFavorite,
  saveRecipeToFavorite,
} from '../services/localStorage';
import StartRecipeButton from '../styles/StartRecipeButton';
import { RecipeDetalsAPI } from '../services/fetchApi';

function MealInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [details, setDetails] = useState([]);
  const [copied, setcopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const screen = pathname.includes('meals') && 'meals';
      const response = await RecipeDetalsAPI(pathname, id);
      const result = response[screen];
      setDetails(result);
    };
    fetchDetails();
  }, [id, pathname]);

  useEffect(() => {
    setIsFavorite(checkRecipeIsFavorited(details[0], 'meal'));
  }, [details]); // eslint-disable-line

  const shareLink = () => {
    copy(`http://localhost:3000${pathname}`);
    setcopied(true);
  };

  const handlefavorited = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      saveRecipeToFavorite(details[0], 'meal');
    } else removeRecipeToFavorite(details[0], 'meal');
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

  // const handleChecked = ({ target: { id } }) => {
  // };

  return (
    <section>
      {details.length && details.map((detail) => (
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
          {getIngredientsAndMeasures()
            .map((result, index) => ((result !== '  '
            && result !== ' ' && result !== null) && (
              <label
                htmlFor={ result }
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  name="ingredient"
                  id={ result }
                // checked={ isChecked }
                // onClick={ handleChecked }
                />
                {result}
              </label>
            )))}
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
          <button
            type="button"
            onClick={ handlefavorited }
            data-testid="favorite-btn"
            src={ isFavorite ? FavoriteIcon : notFavoriteIcon }
          >
            Favoritar
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
        </div>
      ))}
      <StartRecipeButton
        // onClick={ () => history.push(`${pathname}/in-progress`) }
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </StartRecipeButton>
    </section>
  );
}

export default MealInProgress;
