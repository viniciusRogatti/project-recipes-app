import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import {
  saveProgressesRecipesMeals,
  saveProgressesRecipesDrinks,
  getProgessesRecipes } from '../services/localStorage';
import useRecipes from '../hooks/useRecipes';

function Ingredients({ ingredient, inProgress, index }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [isChecked, setIsChecked] = useState(false);
  const type = pathname.includes('meals') ? 'meals' : 'drinks';
  const { setRecipesMade } = useRecipes();

  useEffect(() => {
    const checkedIngredient = getProgessesRecipes()[type][id];
    if (checkedIngredient) setIsChecked(checkedIngredient.includes(ingredient));
  }, []); // eslint-disable-line

  const handleChange = ({ target: { checked } }) => {
    setIsChecked(checked);
    if (type === 'drinks') saveProgressesRecipesDrinks(id, ingredient);
    else saveProgressesRecipesMeals(id, ingredient);
    setRecipesMade(getProgessesRecipes()[type][id].length);
  };

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
          id={ ingredient }
          onChange={ handleChange }
          checked={ isChecked }
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
