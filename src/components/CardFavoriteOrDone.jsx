import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { removeRecipeToFavorite } from '../services/localStorage';
import useRecipes from '../hooks/useRecipes';
import { BoxBtn, BoxImage, BoxInfo, CardRecipe } from '../styles/favorites';
import { DesLikeIcon, ShareIcon } from '../styles/_icons';

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
    <CardRecipe>
      <BoxImage>
        <Link to={ `${screen}/${recipe.id}` }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
      </BoxImage>
      <BoxInfo>
        <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name }</h1>
        <h2 data-testid={ `${index}-horizontal-top-text` }>
          { `${recipe[titleCard]} - ${recipe.category}` }
        </h2>
        { isDone && (
          <h5 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate }</h5>
        )}
        <BoxBtn>
          <ShareIcon
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ shareLink }
            className={ isDone && 'absolute' }
          />
          { isDone ? recipe.tags.map((tag) => (
            <span
              key={ `tag-id:${tag}` }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          )) : (
            <DesLikeIcon
              onClick={ handlefavorited }
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          )}
        </BoxBtn>
        { copiedLink ? <span>Link copied!</span> : ''}
      </BoxInfo>
    </CardRecipe>
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
