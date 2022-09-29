import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function Ingredients({ ingredient, inProgress, index }) {
  const { id } = useParams();
  const handleChange = () => {
    console.log(id);
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
          name="ingredient"
          id={ ingredient }
          onChange={ handleChange }
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
