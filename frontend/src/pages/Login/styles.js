import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f2f2f2;
`;

export const Image = styled.img`
  width: 24.625rem;
  height: 24.25rem;

  @media(max-width: 800px) {
    display: none
  }
`;
