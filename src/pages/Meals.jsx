import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <>
      <main style={ { display: 'flex', flexDirection: 'column' } }>
        <Header title="Meals" searchAble />
        <Categories />
        <Recipes />
      </main>
      <Footer />
    </>

  );
}

export default Meals;
