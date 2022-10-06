import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BoxBtn, BoxImage, BoxInfo, CardRecipe } from '../styles/favorites';
import ShareAnimation from './LottieAnimations/ShareAnimation';
import LikeAnimation from './LottieAnimations/LikeAnimation';

function CardFavoriteOrDone({ recipe, index, isDone }) {
  const screen = recipe.type === 'drink' ? 'drinks' : 'meals';
  const titleCard = recipe.type === 'drink' ? 'alcoholicOrNot' : 'nationality';

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
          <ShareAnimation
            data-testid={ `${index}-horizontal-share-btn` }
            className={ isDone && 'absolute' }
            pathname={ `/${screen}/${recipe.id}` }
          />
          { isDone ? recipe.tags?.map((tag) => (
            <span
              key={ `tag-id:${tag}` }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          )) : (
            <LikeAnimation
              detail={ recipe }
              type={ screen }
            />
          )}
        </BoxBtn>
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
