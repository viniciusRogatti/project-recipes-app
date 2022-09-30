import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipe({
  recipe,
  imgTestId,
  titleTestId,
  nameTestId,
  dateTestId,
  shareTestId,
  index,
  type }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const screen = type === 'drink' ? 'drinks' : 'meals';
  const titleCard = type === 'drink' ? 'alcoholicOrNot' : 'nationality';
  const shareLink = () => {
    copy(`http://localhost:3000/${screen}/${recipe.id}`);
    setCopiedLink(true);
  };

  return (
    <div>
      <Link to={ `${screen}/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ imgTestId }
        />
        <h3 data-testid={ nameTestId }>{recipe.name }</h3>
      </Link>
      <h3 data-testid={ titleTestId }>
        { `${recipe[titleCard]} - ${recipe.category}` }
      </h3>
      <h3 data-testid={ dateTestId }>{recipe.doneDate }</h3>
      <button
        type="button"
        data-testid={ shareTestId }
        onClick={ shareLink }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="link video" />
      </button>
      { copiedLink ? <span>Link copied!</span> : ''}
      { recipe.tags.map((tag) => (
        <span
          key={ `tag-id:${tag}` }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </span>
      ))}

    </div>
  );
}

CardDoneRecipe.propTypes = {
  recipe: PropTypes.string,
  titleTestId: PropTypes.string,
  imgTestId: PropTypes.string,
  nameTestId: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default CardDoneRecipe;
