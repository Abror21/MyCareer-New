import styled from 'styled-components';

export const StyledMobileMenu = styled.div`
  width: 100%;
  background: var(--section-bg-color);
  padding: 38px 0 30px;
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 10000;
  min-height: calc(100vh - var(--header-height));
  height: calc(100vh - var(--header-height)) ;
  overflow-y: scroll;
  transition: 0.5s;

  .navbar {
    display: flex;
    flex-direction: column;
    align-items: end;
    row-gap: 30px;
  }

  .item {
    font-family: var(--primary-font);
    font-size: 1.66667rem;
    line-height: normal;
    font-weight: 700;

    &.active {
      color: var(--base-color);
    }
  }

  .btn.login-btn {
    min-width: 200px;
    height: 45px;
    padding: 0 72.5px;
  }
`;
