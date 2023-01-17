import styled from 'styled-components';

export const Container = styled.header`
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: ${(props) => props.height};
`;

export const NavBar = styled.div`
  background: #FCDC36;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 7px 25px;
  width: 100%;
  height: 60px;
`;

export const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px;
  gap: 10px;

  span {
    text-align: center;
    letter-spacing: 0.105em;
    text-transform: uppercase;
    color: #41197F;
    font-weight: bold;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 0.105em;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 120px;
  background: #41197F;
  border-radius: 10px;
  color: #FFFFFF;

  input[type=text] {
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #B1B1B1;
    border-radius: 5px;
    height: 40px;
    padding-left: 15px;
  }
  button {
    width: 70%;
    height: 25px;
    border: none;
    background: #FCC436;
    border-radius: 5px;
    text-align: center;
    letter-spacing: 0.03em;
    font-weight: 500;
    text-transform: uppercase;
    color: #FFFFFF;
  }
`;

export const FilterBox = styled.div`
margin: 10px 0;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    margin: 10px 0 5px;
    display: flex;
    align-items: center;
    font-family: 'Epilogue';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 9px;

    input[type="radio"] {
      margin-right: 5px;
      -webkit-appearance: none;
      cursor: pointer;
      appearance: none;
      background-color: #FFFFFF;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      transform: translateY(-0.075em);
      place-content: center;
    }
    input[type="radio"]::before {
      content: "";
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      background-color: #FCC436;
    }
    input[type="radio"]:checked::before {
      transform: scale(1);
      background-color: #FCC436;
    }
    input[type="radio"]:focus {
      outline-offset: max(2px, 0.15em);
      background-color: #FCC436;
    }
  }
`;
