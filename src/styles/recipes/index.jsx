import styled from 'styled-components';

export const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto 50px;

  h1 {
    margin-top: 2%;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #FCC436;
    font-size: 22px;
  }
`;

export const BoxHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 180px;

  h3 {
    margin-top: 5%;
    text-align: center;
    font-size: 24px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #FCC436;
  }
  h4 {
    text-align: center;
    font-size: 18px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #FFFFFF;
  }

  svg {
    margin-top: 15px;
    width: 40px;
    height: 30px;
  }
`;

export const BoxImage = styled.div`
  position: absolute;
  z-index: -1;
  background-image: url(${(props) => props.banner});
  background-size: cover;
  background-position: end;
  background-repeat: no-repeat;
  filter: contrast(40%);
  opacity: 0.9;
  width: 100%;
  height: 100%;
`;

export const ContainerIcons = styled.div`
  display: flex;
  margin: 5px 0 20px;
`;

export const BoxIcons = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 50%;
  height: 80px;
  font-weight: bold;
  color: #FCC436;
  font-size: 18px;
  letter-spacing: 0.105em;

  svg {
    max-width: 150px;
    max-height: 80px;
  }

  .like-icon {
    position: absolute;
    top: 20px;
  }

  .share-icon {
    position: absolute;
    top: 22px;
  }
`;

export const BoxIngredient = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  background: #FFFFFF;
  border: 0.554397px solid #B1B1B1;
  border-radius: 5.35144px;

  li {
    margin-top: 2px;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #1A1B1C;
  }
`;

export const BoxIngredientInProgress = styled.li`
  position: relative;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  list-style: none;

  label {
    position: relative;
    display: flex;
    align-items: center;
    margin: 5px;
  }

  input[type="checkbox"] {
    position: relative;
    top: 2px;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    -webkit-appearance: none;
    outline: none;
    transition: 1.0s;
  }

  input[type="checkbox"]:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #121212;
    box-sizing: border-box;
    transition: .5s;
  }
  input:checked[type="checkbox"]:before {
    position: absolute;
    border: 4px solid #FCC436;
    top: -15px;
    left: 5px;
    border-left: none;
    border-top: none;
    width: 10px;
    transform: rotate(45deg) translate(5px, 10px);
  }
`;

export const BoxInstructions = styled.section`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
  background: #FFFFFF;
  padding: 20px;
  border: 0.554397px solid #B1B1B1;
  border-radius: 5.35144px;
  font-size: 14px;
  line-height: 16px;
  color: #1A1B1C;
`;

export const BoxVideo = styled.section`
  max-width: 100%;
  height: 250px;
  margin-bottom: 5px;

  iframe {
    width: 100%;
    height: 200px;
  }
`;

export const BoxCarrousel = styled.section`
  display: flex;
  position: relative;
  width: 100%;

  .chevron-left {
    position: absolute;
    width: 30px;
    height: 30px;
    left: 2px;
    top: 40%;
  }

  .chevron-right {
    position: absolute;
    width: 30px;
    height: 30px;
    transform: rotate(180deg);
    right: 2px;
    top: 40%;
  }
`;
