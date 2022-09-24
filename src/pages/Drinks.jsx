import React, { useContext } from 'react';
import DrinkCards from '../components/DrinkCards';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { ALERT_MSG, RECIPES_LIMIT } from '../services/helpers/Consts';

function Drinks() {
  const { drinks } = useContext(RecipesContext);
  return (
    <div>
      <Header title="Drinks" searchAble />
      {drinks?.length ? drinks.map((drink, index) => (index < RECIPES_LIMIT && (
        <DrinkCards drink={ drink } index={ index } key={ drink.idDrink } />
      ))) : global.alert(ALERT_MSG)}
    </div>

  );
}

export default Drinks;
