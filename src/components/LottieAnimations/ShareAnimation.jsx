import Lottie from 'lottie-react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useEffect, useRef, useState } from 'react';
import ShareAnimationJson from '../../assets/LottieJson/share.json';

const animationStartFrame = 60;
const animationEndFrame = 90;
const reverseDirection = -1;
const normalDirection = 1;
const oneSecond = 1000;

function ShareAnimation({ pathname }) {
  const animation = useRef(null);
  const [share, setShare] = useState(false);

  useEffect(() => {
    animation?.current.playSegments([animationStartFrame, animationEndFrame], true);
    animation?.current.goToAndStop([animationStartFrame, animationStartFrame]);
  }, []);

  useEffect(() => {
    if (share) {
      setShare(animation.current.getDuration(true));
    }
  }, [share]);

  const handleClick = () => {
    setShare(share);
    copy(`http://localhost:3000${pathname}`);
    animation.current.setDirection(normalDirection);
    animation.current.play();
    setTimeout(() => {
      animation.current.setDirection(reverseDirection);
      animation.current.play();
    }, oneSecond);
  };

  return (
    <Lottie
      animationData={ ShareAnimationJson }
      autoplay={ false }
      loop={ false }
      lottieRef={ animation }
      onClick={ handleClick }
      className="share-icon"
    />
  );
}

ShareAnimation.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default ShareAnimation;
