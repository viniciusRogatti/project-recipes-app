import React from 'react';
import PropTypes from 'prop-types';
import { MINUS_WATCH, PLUS_EMBED } from '../services/helpers/Consts';
import { BoxVideo } from '../styles/recipes';

function VideoRecipe({ recipe }) {
  return (
    <BoxVideo>
      <h1>
        Video
      </h1>
      <iframe
        data-testid="video"
        src={ recipe.strYoutube?.replace(MINUS_WATCH, PLUS_EMBED) }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </BoxVideo>
  );
}

VideoRecipe.propTypes = {
  recipe: PropTypes.string,
}.isRequired;

export default VideoRecipe;
