import styled from 'styled-components';
import { ReactComponent as allMealsIcon } from '../_images/All.svg';
import { ReactComponent as beefIcon } from '../_images/beef.svg';
import { ReactComponent as breakFastIcon } from '../_images/breakfast.svg';
import { ReactComponent as chickenIcon } from '../_images/chicken.svg';
import { ReactComponent as dessertIcon } from '../_images/dessert.svg';
import { ReactComponent as goatIcon } from '../_images/lamb.svg';
import { ReactComponent as allDrinks } from '../_images/AllDrink.svg';
import { ReactComponent as ordinaryDrinkIcon } from '../_images/drink.svg';
import { ReactComponent as cocktailIcon } from '../_images/cocktail.svg';
import { ReactComponent as shakeIcon } from '../_images/shake.svg';
import { ReactComponent as otherIcon } from '../_images/other.svg';
import { ReactComponent as cocoaIcon } from '../_images/cocoa.svg';

export const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  height: 60px;

  button {
    width: 45px;
  }
`;

export const AllMealsIcon = styled(allMealsIcon)``;
export const BeefIcon = styled(beefIcon)``;
export const BreakFastIcon = styled(breakFastIcon)``;
export const ChickenIcon = styled(chickenIcon)``;
export const DessertIcon = styled(dessertIcon)``;
export const GoatIcon = styled(goatIcon)``;

export const AllDrinks = styled(allDrinks)``;
export const OrdinaryDrinkIcon = styled(ordinaryDrinkIcon)``;
export const CocktailIcon = styled(cocktailIcon)``;
export const ShakeIcon = styled(shakeIcon)``;
export const OtherIcon = styled(otherIcon)``;
export const CocoaIcon = styled(cocoaIcon)``;
