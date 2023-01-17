import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import {
  PROFILE_TOP_BTN,
  SEARCH_TOP_BTN,
  TITLE_HEADER_TESTID } from '../services/helpers/Consts';
import {
  IconRecipes,
  TitleIcon,
  SearchIcon,
  PerfilIcon,
  DrinksIcon,
  DoneIcon,
  FavoriteIcon,
  FoodsTitle }
  from '../styles/_icons';
import { Container, LogoBox, NavBar } from '../styles/header';

const objectIcons = {
  'Done Recipes': <DoneIcon />,
  'Favorite Recipes': <FavoriteIcon />,
  Drinks: <DrinksIcon fill="#FCC436" />,
  Meals: <FoodsTitle />,
  Profile: <PerfilIcon fill="#FCC436" />,
};

function Header({ title, searchAble }) {
  const [toggleSearch, setToggleSearch] = useState(false);
  return (
    <Container height={ toggleSearch ? '370px' : '150px' }>
      <NavBar>
        <Link to="/meals">
          <IconRecipes />
        </Link>
        <TitleIcon />
        { searchAble && (
          <SearchIcon
            data-testid={ SEARCH_TOP_BTN }
            onClick={ () => setToggleSearch(!toggleSearch) }
          />)}
        <Link to="/profile">
          <PerfilIcon fill="#41197F" data-testid={ PROFILE_TOP_BTN } />
        </Link>
      </NavBar>
      <LogoBox data-testid={ TITLE_HEADER_TESTID }>
        { objectIcons[title]}
        <span>{ title }</span>
      </LogoBox>
      { toggleSearch && (<SearchBar />)}
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchAble: PropTypes.bool.isRequired,
};

export default Header;
