import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RecipeDetalsAPI } from '../services/fetchApi';

function DrinkDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const screen = pathname.includes('drinks') && 'drinks';
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
            <p data-testid="instructions">{detail.strInstructions}</p>
          </div>
        ))
      }
    </section>
  );
}

export default DrinkDetails;
