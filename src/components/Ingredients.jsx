import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import { getProgessesRecipes, saveProgressesRecipes } from '../services/localStorage';
import useRecipes from '../hooks/useRecipes';
import { BoxIngredientInProgress } from '../styles/recipes';

function Ingredients({ ingredient, inProgress, index, isChecked }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [handleChecked, setHandleChecked] = useState(null);
  const { setRecipesMade } = useRecipes();

  const type = pathname.includes('meals') ? 'meals' : 'drinks';

  const handleChange = ({ target: { checked } }) => {
    setHandleChecked(checked);
    saveProgressesRecipes(id, ingredient, type);
    setRecipesMade(getProgessesRecipes()[type][id].length);
  };

  const value = handleChecked || isChecked;

  return (
    !inProgress ? (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {ingredient}
      </li>
    ) : (
      <BoxIngredientInProgress>
        <label
          htmlFor={ ingredient }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ ingredient }
            onChange={ handleChange }
            checked={ value }
          />
          {ingredient}
        </label>
      </BoxIngredientInProgress>
    )
  );
}

Ingredients.propTypes = {
  ingredient: PropTypes.string,
  inProgress: PropTypes.bool,
}.isRequired;

export default Ingredients;
