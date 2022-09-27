import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const Main = styled.main`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow-y: auto;
  margin: 0 auto;

  width: 95%;
  height: 100%;
  min-height: 0;
  gap: 10px;
`;

export const RecipesCard = styled.div`
  width: 48%; 
  border: 0.517989px solid #B1B1B1;
  border-radius: 5px;
  flex: none;

  h3 {
    color: #1A1B1C;
    font-weight: 400;
    font-size: 16px;
    line-height: 12px;
    margin: 9px 14px;
    font-family: 'Epilogue';
  }

  a {
    text-decoration : none;
    color: #1A1B1C;
  }
`;
