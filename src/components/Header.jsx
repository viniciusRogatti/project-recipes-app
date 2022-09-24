import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, searchAble }) {
  const [toggleSearch, setToggleSearch] = useState(false);
  return (
    <div>
      <h1 data-testid="page-title">
        {title}
      </h1>
      { toggleSearch && (
        <SearchBar />
      )}
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          type="image/svg+xml"
          src={ profileIcon }
          alt="profile-icon"
        />
      </Link>

      { searchAble
        && (
          <button type="button" onClick={ () => setToggleSearch(!toggleSearch) }>
            <img
              data-testid="search-top-btn"
              type="image/svg+xml"
              src={ searchIcon }
              alt="search-icon"
            />
          </button>
        )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchAble: PropTypes.bool.isRequired,
};

export default Header;
