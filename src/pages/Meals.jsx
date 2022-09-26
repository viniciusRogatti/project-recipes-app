import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealCards from '../components/MealCards';
import useRecipes from '../hooks/useRecipes';
import { RECIPES_LIMIT } from '../services/helpers/Consts';
import { AllRecipesAPI } from '../services/fetchApi';

function Meals() {
  const { meals, setSearchRecipes, searchRecipes } = useRecipes();
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const CallRecipes = async () => {
      setRecipes(await AllRecipesAPI(pathname));
      setSearchRecipes(false);
    };
    CallRecipes();
  }, [pathname]); // eslint-disable-line

  return (
    <>
      <main style={ { display: 'flex', flexDirection: 'column' } }>
        <Header title="Meals" searchAble />
        <section
          style={ { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' } }
        >
          {searchRecipes ? (
            meals?.length && meals.map((meal, index) => (index < RECIPES_LIMIT && (
              <MealCards meal={ meal } index={ index } key={ meal.idMeal } />
            )))) : (
            recipes.meals?.length && recipes.meals
              .map((recipe, index) => (index < RECIPES_LIMIT && (
                <MealCards meal={ recipe } index={ index } key={ recipe.idMeal } />
              )))
          )}

        </section>
      </main>
      <Footer />
    </>

  );
}

export default Meals;
