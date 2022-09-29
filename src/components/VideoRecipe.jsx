import React from 'react';
import PropTypes from 'prop-types';
import { MINUS_WATCH, PLUS_EMBED } from '../services/helpers/Consts';

function VideoRecipe({ recipe }) {
  return (
    <div>
      <h5>
        Video
      </h5>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ recipe.strYoutube.replace(MINUS_WATCH, PLUS_EMBED) }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

VideoRecipe.propTypes = {
  recipe: PropTypes.string,
}.isRequired;

export default VideoRecipe;
