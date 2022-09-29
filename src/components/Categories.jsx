import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import { fetchAllCategories, fetchCategory } from '../services/fetchApi';
import { CATEGORIES_LIMIT, MEALS_PATH } from '../services/helpers/Consts';
import { Container } from '../styles/categorias';

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

  const filterCategory = async ({ target }) => {
    const fetch = await fetchCategory(pathname, target.innerText);
    setSavecategory(target.innerText);
    if (saveCategory === target.innerText) return setIsSearching(!isSearching);
    if (target.innerText === 'All') return setIsSearching(false);
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
    </Container>
  );
}

export default Categories;
