import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { RecipesCard } from '../styles/main';
import { DRINKS_PATH, MEALS_PATH } from '../services/helpers/Consts';

function Card({ recipe, index }) {
  const { pathname } = useLocation();

  const cardImage = pathname.includes('meals') ? 'strMealThumb' : 'strDrinkThumb';
  const cardName = pathname.includes('meals') ? 'strMeal' : 'strDrink';
  const cardId = pathname.includes('meals') ? 'idMeal' : 'idDrink';
  const path = pathname.includes('meals') ? MEALS_PATH : DRINKS_PATH;

  return (
    <RecipesCard data-testid={ `${index}-recipe-card` }>
      <Link to={ `${path}/${recipe[cardId]}` }>
        <img
          src={ recipe[cardImage] }
          alt={ recipe[cardName] }
          data-testid={ `${index}-card-img` }
        />
        <h3 data-testid={ `${index}-card-name` }>{recipe[cardName]}</h3>
      </Link>
    </RecipesCard>
  );
}

Card.propTypes = {
  recipe: PropTypes.string,
}.isRequired;

export default Card;
