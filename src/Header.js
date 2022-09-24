import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from './images/profileIcon.svg';
import searchIcon from './images/searchIcon.svg';

function Header({ title, searchAble }) {
  return (
    <div>
      <h1
        data-testid="page-title"
      >
        {title}
      </h1>
      <object
        data-testid="profile-top-btn"
        type="image/svg+xml"
        src={ profileIcon }
      >
        Profile
      </object>
      {
        searchAble
        && (
          <object
            data-testid="search-top-btn"
            type="image/svg+xml"
            src={ searchIcon }
          >
            Search
          </object>
        )
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchAble: PropTypes.bool.isRequired,
};

export default Header;
