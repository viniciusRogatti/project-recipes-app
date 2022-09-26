import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import { fetchAllCategories, fetchCategory } from '../services/fetchApi';
import { CATEGORIES_LIMIT, MEALS_PATH } from '../services/helpers/Consts';

function Categories() {
  const { pathname } = useLocation();
  const [categories, setCategories] = useState({});
  const { setTrueMeals, setTrueDrinks, setSearchRecipes } = useRecipes();

  useEffect(() => {
    const fetch = async () => {
      const screen = pathname === MEALS_PATH ? 'meals' : 'drinks';
      const response = await fetchAllCategories(pathname);
      const result = response[screen];
      setCategories(result);
    };
    fetch();
  }, [pathname]);

  const filterCategory = async ({ target }) => {
    const fetch = await fetchCategory(pathname, target.innerText);
    if (target.innerText === 'All') return setSearchRecipes(false);
    if (pathname === MEALS_PATH) return setTrueMeals(fetch.meals);
    return setTrueDrinks(fetch.drinks);
  };

  return (
    <div>
      {(
        categories?.length && categories
          .map((category, index) => (index < CATEGORIES_LIMIT && (
            <button
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              key={ index }
              onClick={ filterCategory }
            >
              {category.strCategory}
            </button>
          ))))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ filterCategory }
      >
        All
      </button>
    </div>
  );
}

export default Categories;
