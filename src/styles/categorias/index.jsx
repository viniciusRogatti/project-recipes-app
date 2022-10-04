import styled, { css } from 'styled-components';
import { ReactComponent as allMealsIcon } from '../_images/All.svg';
import { ReactComponent as beefIcon } from '../_images/beef.svg';
import { ReactComponent as breakFastIcon } from '../_images/breakfast.svg';
import { ReactComponent as chickenIcon } from '../_images/chicken.svg';
import { ReactComponent as dessertIcon } from '../_images/dessert.svg';
import { ReactComponent as goatIcon } from '../_images/lamb.svg';
import { ReactComponent as allDrinks } from '../_images/AllDrink.svg';
import { ReactComponent as ordinaryDrinkIcon } from '../_images/ordinary-drink.svg';
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
  margin-top: 12px;

  button {
    background: transparent;
    border: none;
    z-index: 0;
    cursor: pointer;
  }
`;

const iconsCss = css`
  width: 45px;
  height: 60px;
  z-index: 1;

  path {
    z-index: 0;
    pointer-events: none;
  }
`;

export const BreakFastIcon = styled(breakFastIcon)`
  width: 50px;
  height: 60px;
  z-index: 1;

  path {
    z-index: 0;
    pointer-events: none;
  }
`;

export const AllMealsIcon = styled(allMealsIcon)`${iconsCss}`;
export const BeefIcon = styled(beefIcon)`${iconsCss}`;
export const ChickenIcon = styled(chickenIcon)`${iconsCss}`;
export const DessertIcon = styled(dessertIcon)`${iconsCss}`;
export const GoatIcon = styled(goatIcon)`${iconsCss}`;

export const AllDrinks = styled(allDrinks)`${iconsCss}`;
export const OrdinaryDrinkIcon = styled(ordinaryDrinkIcon)`${iconsCss}`;
export const CocktailIcon = styled(cocktailIcon)`${iconsCss}`;
export const ShakeIcon = styled(shakeIcon)`${iconsCss}`;
export const OtherIcon = styled(otherIcon)`${iconsCss}`;
export const CocoaIcon = styled(cocoaIcon)`${iconsCss}`;
