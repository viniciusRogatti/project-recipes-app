import DrinkCards from '../components/DrinkCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useRecipes from '../hooks/useRecipes';
import { ALERT_MSG, RECIPES_LIMIT } from '../services/helpers/Consts';

function Drinks() {
  const { drinks } = useRecipes();
  console.log(drinks);
  return (
    <>
      <div>
        <Header title="Drinks" searchAble />
        {drinks?.length ? drinks.map((drink, index) => (index < RECIPES_LIMIT && (
          <DrinkCards drink={ drink } index={ index } key={ drink.idDrink } />
        ))) : global.alert(ALERT_MSG)}
      </div>
      <Footer />
    </>

  );
}

export default Drinks;
