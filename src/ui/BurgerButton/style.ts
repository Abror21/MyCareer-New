import styled from 'styled-components';

export const StyledBurgerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  font-size: 36px;

  @media screen and (min-width: 1280px) {
    display: none;
  }
`;
