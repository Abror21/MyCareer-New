import styled from 'styled-components';

export const StyledAdminNav = styled.div`
  display: flex;
  height: 95px;
  padding: 25px 45px;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: var(--base-color);
  color: var(--white, #fff);

  .navbar-inner {
    height: 100%;
    display: flex;
    align-items: center;
    column-gap: 50px;
    @media screen and (min-width: 1280px) {
      justify-content: space-between;
      column-gap: 50px;
    }
  }

  .navigate-inner {
    display: flex;
    align-items: center;
    column-gap: 30px;
    flex: 1;
    max-width: max-content;
  }

  .logo {
    margin-bottom: 1%;
  }

  .item {
    font-size: 1.11111rem;
    line-height: normal;
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
`;
