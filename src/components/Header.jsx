import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, searchAble }) {
  return (
    <div>
      <h1
        data-testid="page-title"
      >
        {title}
      </h1>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          type="image/svg+xml"
          src={ profileIcon }
          alt="profile-icon"
        />
      </Link>

      {
        searchAble
        && (
          <img
            data-testid="search-top-btn"
            type="image/svg+xml"
            src={ searchIcon }
            alt="search-icon"
          />
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
