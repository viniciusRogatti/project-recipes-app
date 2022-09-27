import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import {
  PROFILE_TOP_BTN,
  SEARCH_TOP_BTN,
  TITLE_HEADER_TESTID } from '../services/helpers/Consts';
import { Container, IconRecipes, NavBar, TitleIcon } from '../styles/header';

function Header({ title, searchAble }) {
  const [toggleSearch, setToggleSearch] = useState(false);
  return (
    <Container width={ toggleSearch ? '250px' : '150px' }>
      <NavBar>
        <IconRecipes />
        <TitleIcon />
        { searchAble && (
          <button type="button" onClick={ () => setToggleSearch(!toggleSearch) }>
            <img
              data-testid={ SEARCH_TOP_BTN }
              type="image/svg+xml"
              src={ searchIcon }
              alt="search-icon"
            />
          </button>)}
        <Link to="/profile">
          <img
            data-testid={ PROFILE_TOP_BTN }
            type="image/svg+xml"
            src={ profileIcon }
            alt="profile-icon"
          />
        </Link>
      </NavBar>
      <h1 data-testid={ TITLE_HEADER_TESTID }>
        {title}
      </h1>
      { toggleSearch && (<SearchBar />)}
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchAble: PropTypes.bool.isRequired,
};

export default Header;
