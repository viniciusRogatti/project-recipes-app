import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useRecipes from '../hooks/useRecipes';
import { AllRecipesAPI } from '../services/fetchApi';
import { RECIPES_LIMIT } from '../services/helpers/Consts';
import { Main } from '../styles/main';
import Card from './Card';

function Recipes() {
  const { filteredBarRecipes, setIsSearching, isSearching } = useRecipes();
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState([]);

  const type = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    const CallRecipes = async () => {
      setRecipes(await AllRecipesAPI(pathname));
      setIsSearching(false);
    };
    CallRecipes();
  }, [pathname, setIsSearching]);

  return (
    <Main>
      {isSearching ? filteredBarRecipes.map((recipe, index) => (index < RECIPES_LIMIT && (
        <Card
          recipe={ recipe }
          index={ index }
          key={ `id:${index}-search` }
          titleTestId={ `${index}-recipe-card` }
          imgTestId={ `${index}-card-img` }
          nameTestId={ `${index}-card-name` }
          type={ type }
        />
      ))) : (
        recipes[type]?.length && recipes[type]
          .map((recipe, index) => (index < RECIPES_LIMIT && (
            <Card
              recipe={ recipe }
              key={ `id:${index}-recipe` }
              titleTestId={ `${index}-recipe-card` }
              imgTestId={ `${index}-card-img` }
              nameTestId={ `${index}-card-name` }
              type={ type }
            />
          )))
      )}
    </Main>
  );
}

export default Recipes;
