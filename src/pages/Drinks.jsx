import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <>
      <Header title="Drinks" searchAble />
      <Categories />
      <Recipes />
      <Footer />
    </>

  );
}

export default Drinks;
