import styled from 'styled-components';

export const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px auto 62px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  gap: 10px;
`;

export const CardRecipe = styled.div`
  display: flex;
  width: 90%;
  max-height: 150px;
  border: 0.517989px solid #B1B1B1;
  border-radius: 5px;
  background:#FFFFFF;

  .like-icon {
    position: absolute;
    right: 30px;
    top: -30px;
    max-width: 65px;
  }

`;

export const BoxImage = styled.div`
  width: 60%;
  height: 50%;

  img {
    width: 163px;
    max-width: 200.35px;
    max-height: 148px;
    object-fit: cover;
    object-position: center;
  }
`;

export const BoxInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 60%;
  font-family: 'Epilogue';

  h1 {
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    color: #1A1B1C;
    margin-top: 5px;
  }

  h2 {
    font-weight: 300;
    font-size: 15px;
    line-height: 9px;
    color: #797D86;
    margin-top: 2px;
  }

  h5 {
    font-size: 14px;
    line-height: 14px;
    color: #1A1B1C;

    :before {
      content: 'Done in: '
    }
  }

  span {
    color: #797D86;
    background: #D9D9D9;
    padding: 0 5px;
    border-radius: 20px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-weight: 400;
    font-size: 13px;
    line-height: 12px;
  }
`;

export const BoxBtn = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;

  div {
    position: absolute;
    max-width: 100px;
    top: -5px;
    right: -20px;
  }

  span {
    margin: 2px;
  }
`;
