import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { DONE_RECIPES_PATH, FAVORITES_PATH, USER_KEY } from '../services/helpers/Consts';
import { Container, BoxLinks } from '../styles/profile';
import { DoneIcon, FavoriteIcon, LogoutIcon } from '../styles/_icons';

function Profile() {
  const history = useHistory();

  const handleLogoutButton = () => {
    history.push('/');
    localStorage.clear();
  };
  const userEmail = JSON.parse(localStorage.getItem(USER_KEY));

  return (
    <Container>
      <Header title="Profile" searchAble={ false } />
      <h3 data-testid="profile-email">
        { userEmail.email }
      </h3>
      <BoxLinks onClick={ () => history.push(DONE_RECIPES_PATH) }>
        <DoneIcon
          data-testid="profile-done-btn"
        />
        <span>Done Recipes</span>
      </BoxLinks>
      <hr />
      <BoxLinks onClick={ () => history.push(FAVORITES_PATH) }>
        <FavoriteIcon
          data-testid="profile-favorite-btn"
        />
        <span>Favorite Recipes</span>
      </BoxLinks>
      <hr />
      <BoxLinks onClick={ handleLogoutButton }>
        <LogoutIcon
          data-testid="profile-logout-btn"
        />
        <span>Logout</span>
      </BoxLinks>
      <Footer />
    </Container>

  );
}

export default Profile;
