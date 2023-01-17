import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { Container } from '../styles/main';

function Meals() {
  return (
    <Container>
      <Header title="Meals" searchAble />
      <Categories />
      <Recipes />
      <Footer />
    </Container>

  );
}

export default Meals;
