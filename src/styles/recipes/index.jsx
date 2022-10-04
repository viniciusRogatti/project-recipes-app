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
  margin: 0 auto;

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
  height: 170px;

  h3 {
    margin-top: 5%;
    text-align: center;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #FCC436;
  }
  h4 {
    margin-top: 2px;
    text-align: center;
    font-size: 18px;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #FFFFFF;
  }
`;

export const BoxImage = styled.div`
  position: absolute;
  z-index: -1;
  background-image: url(${(props) => props.banner});
  background-size: cover;
  background-position: end;
  background-repeat: no-repeat;
  filter: contrast(30%);
  opacity: 0.8;
  width: 100%;
  height: 100%;
`;

export const BoxIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 15px;
  width: 100vw;
  height: 50px;
`;

export const BoxIngredient = styled.ul`
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

export const BoxInstructions = styled.div`
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

export const BoxVideo = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin-bottom: 5px;

  iframe {
    width: 100%;
    height: 100%;
  }
`;
