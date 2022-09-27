import styled from 'styled-components';
import { ReactComponent as logo } from '../_images/tomate.svg';
import { ReactComponent as logoApp } from '../_images/logo Recipes App.svg';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export const BoxLogo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: #41197F;
  width: 100%;
  height: 50%;
`;

export const LogoApp = styled(logoApp)`
  margin: 30px auto 0;
`;

export const LogoTomate = styled(logo)`
  position: absolute;
  bottom: -125px;
`;

export const BoxLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  background: #F5F5F5;
  width: 100vw;
  height: 50%;
`;

export const ButtonLogin = styled.button`
  background: #FCC436;
  border-radius: 5px;
  width: 80%;
  height: 40px;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  color: #FFFFFF;

  :disabled {
    opacity: 0.3;
  }
`;

export const LoginTitle = styled.h1`
  font-style: italic;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  color: #41197F;
  letter-spacing: 0.165em;
  text-transform: uppercase;
`;

export const InputLogin = styled.input`
  width: 80%;
  height: 40px;
  border: 0.5px solid #41197F;
  border-radius: 5px;
  margin-bottom: 10px;
  padding-left: 20px;
  color: #41197F;

  ::placeholder {
    color: #41197F;
  }

`;
