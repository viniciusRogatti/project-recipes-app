import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../styles/footer';
import { DrinksIcon, FoodsIcon } from '../styles/_icons';

function Footer() {
  return (
    <Container
      data-testid="footer"
      style={ { position: 'fixed', bottom: '0px' } }
    >
      <Link to="/drinks">
        <DrinksIcon data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <FoodsIcon data-testid="meals-bottom-btn" />
      </Link>

    </Container>
  );
}

export default Footer;
