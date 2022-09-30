import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../images/blackHeartIcon.svg';
import { removeRecipeToFavorite } from '../services/localStorage';
import useRecipes from '../hooks/useRecipes';

function CardFavoriteOrDone({ recipe, index, isDone }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const { setTrueUpdate, updateFavorite } = useRecipes();

  const screen = recipe.type === 'drink' ? 'drinks' : 'meals';
  const titleCard = recipe.type === 'drink' ? 'alcoholicOrNot' : 'nationality';

  const shareLink = () => {
    copy(`http://localhost:3000/${screen}/${recipe.id}`);
    setCopiedLink(true);
  };

  const handlefavorited = () => {
    removeRecipeToFavorite(recipe, screen);
    console.log(!updateFavorite);
    setTrueUpdate(!updateFavorite);
  };

  return (
    <div>
      <Link to={ `${screen}/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
        <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name }</h3>
      </Link>
      <h3 data-testid={ `${index}-horizontal-top-text` }>
        { `${recipe[titleCard]} - ${recipe.category}` }
      </h3>
      <h3 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate }</h3>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ shareLink }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="link video" />
      </button>
      { copiedLink ? <span>Link copied!</span> : ''}
      { isDone ? recipe.tags.map((tag) => (
        <span
          key={ `tag-id:${tag}` }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </span>
      )) : (
        <button
          type="button"
          onClick={ handlefavorited }
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ FavoriteIcon }
        >
          Desfavoritar
        </button>
      )}

    </div>
  );
}

CardFavoriteOrDone.propTypes = {
  recipe: PropTypes.string,
  titleTestId: PropTypes.string,
  imgTestId: PropTypes.string,
  nameTestId: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default CardFavoriteOrDone;
