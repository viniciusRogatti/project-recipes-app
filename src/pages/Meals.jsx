import Header from '../components/Header';
import MealCards from '../components/MealCards';
import useRecipes from '../hooks/useRecipes';
import { ALERT_MSG, RECIPES_LIMIT } from '../services/helpers/Consts';

function Meals() {
  const { meals } = useRecipes();
  return (
    <div>
      <Header title="Meals" searchAble />
      {meals?.length ? meals.map((meal, index) => (index < RECIPES_LIMIT && (
        <MealCards meal={ meal } index={ index } key={ meal.idMeal } />
      ))) : global.alert(ALERT_MSG)}
    </div>

  );
}

export default Meals;
