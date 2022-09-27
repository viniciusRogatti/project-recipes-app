import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RecipeDetalsAPI } from '../services/fetchApi';
import { MINUS_WATCH, PLUS_EMBED } from '../services/helpers/Consts';

function MealDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const screen = pathname.includes('meals') && 'meals';
      const response = await RecipeDetalsAPI(pathname, id);
      const result = response[screen];
      setDetails(result);
    };
    fetchDetails();
  }, [id, pathname]);
  console.log(details);
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
            <p data-testid="instructions">{detail.strInstructions}</p>
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
          </div>
        ))
      }
    </section>
  );
}

export default MealDetails;
