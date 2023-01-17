import Lottie from 'lottie-react';
import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import LikeAnimationJson from '../../assets/LottieJson/like.json';
import DesLikeIconAnimationJson from '../../assets/LottieJson/desLike.json';
import {
  checkRecipeIsFavorited,
  removeRecipeToFavorite,
  saveRecipeToFavorite,
} from '../../services/localStorage';
import useRecipes from '../../hooks/useRecipes';
import { FAVORITES_PATH } from '../../services/helpers/Consts';

const oneSecond = 1000;
const timeAnimation = 760;

function LikeAnimation({ detail, type }) {
  const { setTrueUpdate, updateFavorite } = useRecipes();
  const { pathname } = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const animationLike = useRef(null);

  useEffect(() => {
    if (pathname === FAVORITES_PATH) {
      return setIsFavorite(true);
    }
    setIsFavorite(checkRecipeIsFavorited(detail, type));
  }, [detail, type, pathname]);

  const handleClick = () => {
    if (pathname === FAVORITES_PATH) {
      animationLike.current.play();
      return setTimeout(() => {
        removeRecipeToFavorite(detail, type);
        setTrueUpdate(!updateFavorite);
      }, timeAnimation);
    }
    if (!isFavorite && pathname !== FAVORITES_PATH) {
      saveRecipeToFavorite(detail, type);
      animationLike.current.play();
    } else {
      removeRecipeToFavorite(detail, type);
      animationLike.current.play();
    }
    setTimeout(() => {
      setIsFavorite(!isFavorite);
    }, oneSecond);
    setTrueUpdate(!updateFavorite);
  };

  return (
    <Lottie
      animationData={ isFavorite ? DesLikeIconAnimationJson : LikeAnimationJson }
      loop={ false }
      autoplay={ false }
      style={ { width: 100, height: 100 } }
      lottieRef={ animationLike }
      onClick={ handleClick }
      className="like-icon"
    />
  );
}

LikeAnimation.propTypes = {
  detail: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
};

export default LikeAnimation;
