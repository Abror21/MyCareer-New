import styled from 'styled-components';

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;

  height: var(--header-height);
  background: var(--base-color);

  .header__inner {
    height: 100%;
    display: flex;
    align-items: center;

    @media screen and (min-width: 1280px) {
      justify-content: space-between;
      column-gap: 50px;
    }
  }

  .logo {
    color: var(--white);
    margin-bottom: 0.5%;
  }
`;
