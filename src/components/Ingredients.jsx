import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import {
  saveProgressesRecipesMeals,
  saveProgressesRecipesDrinks,
  getProgessesRecipes } from '../services/localStorage';
import useRecipes from '../hooks/useRecipes';

function Ingredients({ ingredient, inProgress, index, isChecked }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [handleChecked, setHandleChecked] = useState(null);
  const { setRecipesMade } = useRecipes();

  const type = pathname.includes('meals') ? 'meals' : 'drinks';

  const handleChange = ({ target: { checked } }) => {
    setHandleChecked(checked);
    if (type === 'drinks') saveProgressesRecipesDrinks(id, ingredient);
    else saveProgressesRecipesMeals(id, ingredient);
    setRecipesMade(getProgessesRecipes()[type][id].length);
  };

  const value = handleChecked || isChecked;

  return (
    !inProgress ? (
      <p
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {ingredient}
      </p>
    ) : (
      <label
        htmlFor={ ingredient }
        key={ index }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          data-testid={ `${index}-ingredient-step` }
          id={ ingredient }
          onChange={ handleChange }
          checked={ value }
        />
        {ingredient}
      </label>
    )
  );
}

Ingredients.propTypes = {
  ingredient: PropTypes.string,
  inProgress: PropTypes.bool,
}.isRequired;

export default Ingredients;
