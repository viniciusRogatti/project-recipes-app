const getIngredientsAndMeasures = (array) => {
  if (array !== undefined) {
    const ingredients = Object.entries(array)
      .filter((info) => info[0].includes('strIngredient'))
      .map((ingredient) => ingredient[1])
      .filter((ingredient) => ingredient !== null
        && ingredient !== '  ' && ingredient !== '');
    const measures = Object.entries(array)
      .filter((info) => info[0].includes('strMeasure'))
      .map((ingredient) => ingredient[1])
      .filter((ingredient) => ingredient !== null
        && ingredient !== '  ' && ingredient !== '');
    const concatTwoArrays = ingredients.map((info, index) => (
      `${measures[index]} ${info}`
    ));
    return concatTwoArrays;
  }
};

export default getIngredientsAndMeasures;
