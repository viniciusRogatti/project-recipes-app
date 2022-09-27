import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import Container from '../styles/footer';

function Footer() {
  return (
    <Container
      data-testid="footer"
      style={ { position: 'fixed', bottom: '0px' } }
    >
      <Link to="/drinks">
        <img
          type="image/svg+xml"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Página de drinks"
        />
      </Link>
      <Link to="/meals">
        <img
          type="image/svg+xml"
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="Página de refeições"
        />
      </Link>

    </Container>
  );
}

export default Footer;
