import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DrinkCards from '../components/DrinkCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useRecipes from '../hooks/useRecipes';
import { RECIPES_LIMIT } from '../services/helpers/Consts';
import { AllRecipesAPI } from '../services/fetchApi';

function Drinks() {
  const { drinks, setSearchRecipes, searchRecipes } = useRecipes();
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const CallRecipes = async () => {
      setRecipes(await AllRecipesAPI(pathname));
      setSearchRecipes(false);
    };
    CallRecipes();
  }, []); // eslint-disable-line 

  return (
    <>
      <main style={ { display: 'flex', flexDirection: 'column' } }>
        <Header title="Drinks" searchAble />
        <section
          style={ { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' } }
        >
          {searchRecipes ? (
            drinks?.length && drinks.map((drink, index) => (index < RECIPES_LIMIT && (
              <DrinkCards drink={ drink } index={ index } key={ drink.idDrinks } />
            )))) : (
            recipes.drinks?.length && recipes.drinks
              .map((recipe, index) => (index < RECIPES_LIMIT && (
                <DrinkCards drink={ recipe } index={ index } key={ recipe.idDrinks } />
              )))
          )}
        </section>
      </main>
      <Footer />
    </>

  );
}

export default Drinks;
