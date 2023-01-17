import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function useRecipes() {
  const value = useContext(RecipesContext);
  return value;
}

export default useRecipes;
