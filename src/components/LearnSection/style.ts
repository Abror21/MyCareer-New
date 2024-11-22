import styled from 'styled-components';
import bg from 'assets/images/learn-bg.png';

export const StyledLearnSection = styled.div`
  position: relative;
  overflow: hidden;

  @media screen and (min-width: 1280px) {
    background: url(${bg}) no-repeat left center;
  }

  .trainigs-container {
    background-color: var(--section-bg-color);
  }

  .inner {
    display: flex;
    flex-direction: column;
    row-gap: 63px;
  }

  .row {
    display: flex;
    flex-direction: column;
    row-gap: 40px;

    &:nth-of-type(even) {
      @media screen and (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-between;
        row-gap: 150px;
      }
    }

    &:nth-of-type(odd) {
      @media screen and (min-width: 1024px) {
        flex-direction: row-reverse;
        justify-content: space-between;
        row-gap: 150px;
      }
    }
  }

  .imageWrapper {
    @media screen and (min-width: 1024px) {
      max-height: 100%;
      max-width: 45%;
      width: auto;
    }
    @media screen and (min-width: 1280px) {
      width: 45%;
      max-width: 672px;
    }
    @media screen and (min-width: 1440px) {
      width: 47%;
      max-width: 672px;
    }
  }

  .image {
    width: 100%;
    height: 100%;

    .ant-image{
      width: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    text-align: center;

    @media screen and (min-width: 1024px) {
      text-align: left;
      margin: auto 0;
      width: 35%;
    }
  }

  .preTitle {
    display: inline-block;
    width: 100%;
    text-align: center;

    font-family: var(--primary-font);
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.30222rem;
    letter-spacing: 4.5px;
    text-transform: uppercase;
    color: var(--base-color);

    @media screen and (min-width: 1024px) {
      text-align: left;
    }
  }

  .title {
    display: inline-block;
    width: 100%;
    text-align: center;

    font-family: var(--primary-font);
    font-size: 2.22222rem;
    line-height: normal;
    font-weight: 700;

    padding: 15px 0;

    @media screen and (min-width: 1024px) {
      text-align: left;
    }
  }

  .learnText {
    font-size: 1rem;
    line-height: 1.55555rem;
    font-weight: 500;
    text-align: center;

    @media screen and (min-width: 1024px) {
      text-align: left;
      max-width: 450px;
    }
    @media screen and (min-width: 1280px) {
      text-align: left;
      max-width: 500px;
    }
  }

  .callToAction {
    font-family: var(--primary-font);
    font-weight: 700;
  }

  .learn-btn {
    min-width: 200px;
    height: 46px;
    margin-top: 24px;
  }
  a {
    display: block;
  }
`;
