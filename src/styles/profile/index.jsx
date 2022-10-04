import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    color: #1A1B1C;
    font-weight: 700;
    line-height: 16px;
    font-size: 16px;
    margin: 40px 0 50px;
  }

  hr {
    height: 0.5px;
    width: 70%;
    background: #B1B1B1;
    border: none;
  }
`;

export const BoxLinks = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: start;
  margin: 20px 0;
  gap: 24px;

  span {
    color: #797D86;
    font-family: 'Epilogue';
    text-transform: capitalize;
    letter-spacing: 0.03em;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
  }
`;
