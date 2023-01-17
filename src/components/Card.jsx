import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RecipesCard } from '../styles/main';
import { DRINKS_PATH, MEALS_PATH } from '../services/helpers/Consts';

function Card({ recipe, titleTestId, imgTestId, nameTestId, type }) {
  const cardImage = type === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const cardName = type === 'meals' ? 'strMeal' : 'strDrink';
  const cardId = type === 'meals' ? 'idMeal' : 'idDrink';
  const path = type === 'meals' ? MEALS_PATH : DRINKS_PATH;

  return (
    <RecipesCard data-testid={ titleTestId }>
      <Link to={ `${path}/${recipe[cardId]}` }>
        <img
          src={ recipe[cardImage] }
          alt={ recipe[cardName] }
          data-testid={ imgTestId }
        />
        <h3 data-testid={ nameTestId }>{recipe[cardName]}</h3>
      </Link>
    </RecipesCard>
  );
}

Card.propTypes = {
  recipe: PropTypes.string,
  titleTestId: PropTypes.string,
  imgTestId: PropTypes.string,
  nameTestId: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Card;
