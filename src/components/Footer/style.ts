import styled from 'styled-components';

export const StyledFooter = styled.footer`
  position: relative;

  .logo-wrapper {
    padding-bottom: 16px;
    border-bottom: 1px solid var(--black);
  }

  .footer-logo {
    color: var(--black);

    font-family: var(--logo-font);
    font-size: 3.33334rem;
    font-weight: 700;

    @media(max-width: 900px) {
      font-size: 2.66667rem;
    }
    @media(max-width: 728px) {
      font-size: 1.66667rem;
    }
  }

  .inner {
    padding: 40px 23px;
  }

  .info {
    display: flex;
    flex-direction: column;
    row-gap: 43px;
    padding: 16px 0;
    font-size: 1rem;
    line-height: 1.55555rem;
    font-weight: 500;

    @media screen and (min-width: 1280px) {
      flex-direction: row;
      justify-content: space-between;
    }
    @media(max-width: 900px) {
      text-align: center;
    }
  }

  .contacts {
    padding: 8px 0;

    &__title {
      font-size: 1.11112rem;
      line-height: normal;
      padding-bottom: 16px;
      font-weight: 700;
      font-family: var(--primary-font);

      @media screen and (min-width: 728px) {
        font-size: 1.66667rem;
      }
    }

    &__list {
      line-height: 1.55556rem;
      display: flex;
      flex-direction: column;
      transition: all 0.3s;

      a {
        transition: all 0.3s;
      }

      a:hover {
        color: var(--accent-color);
      }
    }
  }

  .quick-links {
    padding: 8px 0;

    &__title {
      font-size: 1.11112rem;
      line-height: normal;
      padding-bottom: 16px;
      font-weight: 700;
      font-family: var(--primary-font);

      @media screen and (min-width: 728px) {
        font-size: 1.66667rem;
      }
    }

    &__nav {
      display: flex;
      flex-direction: column;
    }

    &__item {
      line-height: 1.55556rem;
      transition: all 0.3s;

      &.active {
        color: var(--base-color);
      }
    }
  }

  .login-block {
    padding-bottom: 40px;

    button {
      width: 100%;

      @media screen and (min-width: 728px) {
        width: auto;
        min-width: 200px;
        height: 45px;
      }
    }
  }

  .create-account {
    padding-top: 16px;

    @media(max-width: 900px) {
      text-align: center;
    }
  }

  .create-account-link {
    color: var(--accent-color);

    &:hover {
      color: var(--base-color);
    }
  }

  .copyright {
    width: 100%;
    background-color: var(--base-color);
    padding: 13px 0;
    text-align: center;

    font-size: 0.77777rem;
    line-height: 1.55555rem;
    font-weight: 500;
    color: var(--white);
  }

  .logout-btn {
    color: var(--white);
  }
`;
