import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCategories } from '../services/fetchApi';
import { CATEGORIES_LIMIT, MEALS_PATH } from '../services/helpers/Consts';

function Categories() {
  const { pathname } = useLocation();
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const screen = pathname === MEALS_PATH ? 'meals' : 'drinks';
      const response = await fetchCategories(pathname);
      const result = response[screen];
      setCategories(result);
    };
    fetch();
  }, [pathname]);

  return (
    <div>
      {(
        categories?.length && categories
          .map((category, index) => (index < CATEGORIES_LIMIT && (
            <button
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              key={ index }
            >
              {category.strCategory}
            </button>
          ))))}
    </div>
  );
}

export default Categories;
