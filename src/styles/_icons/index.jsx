import styled from 'styled-components';

import { ReactComponent as profileIcon } from '../_images/icone-perfil.svg';
import { ReactComponent as searchIcon } from '../_images/search-icon.svg';
import { ReactComponent as titleIcon } from '../_images/logo-title.svg';
import { ReactComponent as iconRecipes } from '../_images/ícone Recipes app.svg';
import { ReactComponent as foodsIcon } from '../_images/foods.svg';
import { ReactComponent as drinksIcon } from '../_images/drinks.svg';
import { ReactComponent as doneIcon } from '../_images/done.svg';
import { ReactComponent as favoriteIcon } from '../_images/favorite.svg';
import { ReactComponent as logoutIcon } from '../_images/logout.svg';
import { ReactComponent as foodsTitle } from '../_images/icone-prato.svg';
import { ReactComponent as allFilterBarIcon } from '../_images/all-filter-bar.svg';
import { ReactComponent as drinkFilterBarIcon } from '../_images/drinks-filter-bar.svg';
import { ReactComponent as mealsFilterBarIcon } from '../_images/meals-filter-bar.svg';
import { ReactComponent as shareIcon } from '../_images/Share.svg';
import { ReactComponent as likeIcon } from '../_images/like.svg';

export const SearchIcon = styled(searchIcon)`
  width: 33px;
  height: 33px;
  margin-right: 10px;
`;

export const IconRecipes = styled(iconRecipes)`
  width: 40px;
`;

export const ShareIcon = styled(shareIcon)`
  width: 25px;
`;

export const LikeIcon = styled(likeIcon)`
  width: 25px;
  margin-left: 10px;
`;

export const AllFilterBarIcon = styled(allFilterBarIcon)`
  width: 65px;
  height: 85px;
`;
export const DrinkFilterBarIcon = styled(drinkFilterBarIcon)`
  width: 65px;
  height: 85px;
`;
export const MealsFilterBarIcon = styled(mealsFilterBarIcon)`
  width: 65px;
  height: 85px;
`;

export const TitleIcon = styled(titleIcon)`
  width: 120px;
  height: 20px;
  margin: 0 60px 0 20px;
`;

export const LogoutIcon = styled(logoutIcon)`
  width: 40px;
  height: 40px;
`;

export const PerfilIcon = styled(profileIcon)`
  width: 35px;
  height: 35px;
  
  path {
    fill: ${(props) => props.fill};
    stroke: ${(props) => props.fill};
  }
`;

export const FoodsTitle = styled(foodsTitle)`
  width: 40px;
  height: 30px;
`;

export const FoodsIcon = styled(foodsIcon)`
  width: 40px;
  height: 30px;
`;
export const DrinksIcon = styled(drinksIcon)`
  width: 30px;
  height: 30px;

  path {
    fill: ${(props) => props.fill};
    stroke: ${(props) => props.fill};
  }
`;

export const DoneIcon = styled(doneIcon)`
  width: 40px;
  height: 40px;

  path {
    fill: ${(props) => props.fill};
    stroke: ${(props) => props.fill};
  }
`;

export const FavoriteIcon = styled(favoriteIcon)`
  width: 40px;
  height: 40px;

  path {
    fill: ${(props) => props.fill};
    stroke: ${(props) => props.fill};
  }
`;
