import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { DONE_RECIPES_PATH, FAVORITES_PATH } from '../services/helpers/Consts';
// comentário teste

function Profile() {
  const history = useHistory();

  const handleDoneButton = () => {
    history.push(DONE_RECIPES_PATH);
  };

  const handleFavoriteButton = () => {
    history.push(FAVORITES_PATH);
  };

  const handleLogoutButton = () => {
    history.push('/');
    localStorage.clear();
  };
  // const userEmail = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header title="Profile" searchAble={ false } />
      <p data-testid="profile-email">
        {
          localStorage.getItem('user')
        }
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleDoneButton }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleFavoriteButton }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogoutButton }
      >
        Logout
      </button>
      <Footer />
    </div>

  );
}

export default Profile;
