import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import { fetchAllCategories, fetchCategory } from '../services/fetchApi';
import { CATEGORIES_LIMIT, MEALS_PATH } from '../services/helpers/Consts';
import { Container, AllMealsIcon, BeefIcon, BreakFastIcon, ChickenIcon,
  DessertIcon, GoatIcon, AllDrinks, OrdinaryDrinkIcon, CocktailIcon,
  ShakeIcon, OtherIcon, CocoaIcon } from '../styles/categorias';

const arrayOfIconsMeals = [<BeefIcon key="beef" />,
  <BreakFastIcon key="breakFast" />, <ChickenIcon key="chicken" />,
  <DessertIcon key="dessert" />, <GoatIcon key="goat" />];

const arrayOfIconsDrinks = [<OrdinaryDrinkIcon key="ordinary" />,
  <CocktailIcon key="cocktail" />, <ShakeIcon key="shake" />,
  <OtherIcon key="other" />, <CocoaIcon key="cocoa" />];

function Categories() {
  const { pathname } = useLocation();
  const [categories, setCategories] = useState({});
  const [saveCategory, setSavecategory] = useState('');
  const { setTrueFilter, isSearching, setIsSearching } = useRecipes();
  const screen = pathname === MEALS_PATH ? 'meals' : 'drinks';

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchAllCategories(pathname);
      const result = response[screen];
      setCategories(result);
    };
    fetch();
  }, []); // eslint-disable-line

  const filterCategory = async ({ target: { parentElement: { id } } }) => {
    const fetch = await fetchCategory(pathname, id);
    setSavecategory(id);
    if (saveCategory === id) return setIsSearching(!isSearching);
    if (id === 'All') return setIsSearching(false);
    setTrueFilter(fetch[screen]);
  };

  return (
    <Container>
      {(
        categories?.length && categories
          .map((category, index) => (index < CATEGORIES_LIMIT && (
            <button
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              key={ index }
              id={ category.strCategory }
              onClick={ filterCategory }
            >
              { screen === 'meals' ? arrayOfIconsMeals[index] : arrayOfIconsDrinks[index]}
            </button>
          ))))}
      <button
        type="button"
        id="All"
        data-testid="All-category-filter"
        onClick={ filterCategory }
      >
        {screen === 'meals' ? <AllMealsIcon /> : <AllDrinks /> }
      </button>
    </Container>
  );
}

export default Categories;
