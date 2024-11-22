import styled from 'styled-components';

export const StyledCvPage = styled.div`
  padding: var(--main-top);
  margin-top: var(--header-height);
  background: var(--section-bg-color);
  position: relative;
  padding-bottom: 100px;

  .background-image {
    position: absolute;
    top: 0;
    z-index: 0;
    max-height: 1400px;
    width: 100%;
  }
  .create_cv_icon {
    position: absolute;
    left: 280px;
    width: 50px;
    top: 170px;
    z-index: 99;
  }
  .title-page {
    max-width: 1104px;
    z-index: 1;
    position: relative;
    font-family: var(--primary-font);
    font-size: 3.333333rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 50px auto;

    margin-top: 10px;
    color: var(--white);
    @media screen and (min-width: 1024px) {
      font-size: 5rem;
    }
    span {
      color: var(--accent-color-semi-transparent);
    }
  }
  .navigate-back {
    margin: 0 auto;
    max-width: 1104px;
    color: white;
    position: relative;
    z-index: 1;
    font-size: 1.22222rem;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  .spinner {
    min-height: 100vh;
  }
`;
