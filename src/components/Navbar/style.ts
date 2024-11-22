import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  display: none;

  @media screen and (min-width: 1280px) {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 30px;
    flex: 1;
    max-width: max-content;
  }

  nav {
    display: flex;
    align-items: center;
  }

  .item {
    font-family: var(--primary-font);
    font-size: 1.11111rem;
    line-height: 1.27778rem;
    font-weight: 600;
    color: var(--white);
    transition: color 0.3s;
    font-family: var(--primary-font);

    &:hover {
      color: var(--accent-color);
    }

    &.active {
      color: var(--accent-color);
    }
  }

  .ant-btn-primary {
    min-width: 200px;
    height: 45px;
    padding: 0 72.5px;
  }
`;
