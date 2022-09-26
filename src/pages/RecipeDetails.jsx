import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RecipeDetalsAPI } from '../services/fetchApi';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [details, setDetails] = useState([]);
  // console.log(pathname);

  useEffect(() => {
    const fetchDetails = async () => {
      const screen = pathname.includes('meals') ? 'meals' : 'drinks';
      const response = await RecipeDetalsAPI(pathname, id);
      const result = response[screen];
      setDetails(result);
    };
    fetchDetails();
  }, [id, pathname]);
  console.log(details);
  if (details[0] !== undefined) {
    console.log(Object
      .entries(details[0])
      .filter((detaill) => detaill[0].includes('strIngredient' || 'strMeasure'))
      .map((ingredient) => ingredient[1])
      .filter((ingredient) => ingredient !== null));
    console.log(Object
      .entries(details[0])
      .filter((detaill) => detaill[0].includes('strMeasure')));

    console.log();
  }
  return (
    <section>
      {
        details.map((detail) => (
          <div key={ detail.idDrink }>
            <img alt={ detail.strDrink } src={ detail.strDrinkThumb } />
            <h3>{detail.strDrink}</h3>
            <h4>{detail.strCategory}</h4>
            <p>{detail.strAlcoholic}</p>
            <h5>
              Ingredients
            </h5>
            {Object
              .entries(details[0])
              .filter((detaill) => detaill[0].includes('strIngredient'))
              .map((ingredient) => ingredient[1])
              .filter((ingredient) => ingredient !== null)
              .map((ingredient, index) => (
                <p key={ index }>{ingredient}</p>
              ))}

          </div>
        ))
      }
    </section>
  );
}

export default RecipeDetails;
