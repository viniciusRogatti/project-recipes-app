import styled from 'styled-components';

const Carrousel = styled.section`
  position: relative;
  width: 100%;
  max-height: 200px;
  overflow-x: auto;
  display: flex;
  gap: 13px;
  margin-top: 5px;
  border: 1px solid #B1B1B1;
  border-radius: 4px;
  filter: contrast(50%);

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default Carrousel;
