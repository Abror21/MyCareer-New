import styled from 'styled-components';
import bg from 'assets/images/learn-bg.png';

export const StyledAboutPerson = styled.div`
  background-color: var(--section-bg-color) !important;

  @media screen and (min-width: 1280px) {
    background: url(${bg}) no-repeat left center;
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
        flex-direction: row-reverse;
        justify-content: space-evenly;
        row-gap: 150px;
      }
    }

    &:nth-of-type(odd) {
      @media screen and (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-evenly;
        row-gap: 150px;
      }
    }
  }
  .imageWrapper {
    display: flex;
    justify-content: center;
    @media screen and (min-width: 1024px) {
      width: 45%;
      max-height: 100%;
      overflow: hidden;
    }
    @media screen and (min-width: 1280px) {
      width: 45%;
    }
    @media screen and (min-width: 1440px) {
      width: auto;
    }
  }
  .image {
    width: auto;
    height: auto;
    overflow: hidden;
    img {
      width: auto;
      height: auto;
      object-fit: contain;
    }
    @media screen and (min-width: 1024px) {
    }
    @media screen and (min-width: 1280px) {
      width: 528px;
      height: 530px;
    }
    @media screen and (min-width: 1440px) {
      width: 528px;
      height: 530px;
    }
  }

  .content {
    text-align: center;
    display: flex;
    justify-content: center;

    div {
      @media screen and (min-width: 1055px) {
        text-align: left;
        margin: auto 0;
      }
    }
    @media screen and (min-width: 1024px) {
      width: 45%;
      overflow: hidden;
      text-align: left;
    }
    @media screen and (min-width: 1280px) {
      width: 45%;
    }
    @media screen and (min-width: 1440px) {
      width: 528px;
    }
  }

  .preTitle {
    display: inline-block;
    width: 100%;
    text-align: center;

    font-weight: 700;
    font-size: 1rem;
    line-height: 1.30222rem;
    letter-spacing: 4.5px;
    text-transform: uppercase;
    color: var(--base-color);
    font-family: var(--primary-font);

    @media screen and (min-width: 1024px) {
      text-align: left;
    }
  }

  .title {
    display: inline-block;
    width: 100%;
    text-align: center;

    font-family: var(--primary-font);
    font-size: 2rem;
    line-height: normal;
    font-weight: 700;

    padding: 15px 0;

    @media screen and (min-width: 1024px) {
      text-align: left;
      font-size: 2.2222222rem;
    }
  }

  .learnText {
    font-size: 1.1rem;
    line-height: 1.55555rem;
    font-weight: 500;
    text-align: center;

    @media screen and (min-width: 1024px) {
      text-align: left;
      max-width: 450px;
      font-size: 1rem;
    }
    @media screen and (min-width: 1280px) {
      text-align: left;
      max-width: 500px;
    }
  }

  .callToAction {
    margin: 20px 0;

    font-family: var(--primary-font);
    font-weight: 700;
    @media screen and (min-width: 1024px) {
      text-align: left;
      max-width: 450px;
      font-size: 1.11111rem;
    }
  }
`;
