import styled from 'styled-components';
import heroImg from 'assets/images/hero_bg.jpg';

export const StyledHero = styled.div`
  position: relative;
  overflow: hidden;
  
  width: 100%;
  height: 400px;

  margin-top: var(--header-height);

  @media screen and (min-width: 728px) {
    height: calc(100vh - var(--header-height));
  }

  background: url(${heroImg}) no-repeat center center;
  background-size: cover;
  
  .overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
    background: linear-gradient(180deg, rgba(7, 7, 7, 0.6) 45.83%, rgba(58, 112, 179, 0.6) 100%);
  }

  .inner {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    row-gap: 30px;

    position: absolute;
    left: 0;
    right: 0;
    z-index: 4;

    @media screen and (min-width: 1280px) {
      padding-left: 305px !important;
    }
  }

  .title {
    display: inline-block;
    max-width: 724px;
    font-family: var(--primary-font);
    font-size: 2rem;
    line-height: normal;
    font-weight: 700;
    color: var(--white);

    span {
      color: var(--accent-color);
    }

    @media screen and (min-width: 728px) {
      font-size: 3.88888rem;
    }
    @media screen and (min-width: 1280px) {
      font-size: 4.44445rem;
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    column-gap: 20px;

    .login-btn,
    .secondary-btn {
      height: 46px;
      padding: 0 34px;
    }
  }

  .diagonal {
    position: absolute;
    top: -3%;
    right: 20%;
    z-index: 3;

    width: 417px;
    height: 307px;

    svg {
      fill: linear-gradient(233deg, rgba(234, 241, 246, 0.6) -2.77%, rgba(58, 112, 179, 0.6) 92.92%);
    }

    @media screen and (min-width: 728px) {
      width: auto;
      height: auto;
      top: 0;
      right: 35%;
      z-index: 2;
    }
  }

  .curve {
    width: 158px;
    height: 102px;

    position: absolute;
    bottom: 0;
    right: -3px;
    z-index: 3;

    path {
      stroke: var(--white);
    }

    @media screen and (min-width: 728px) {
      width: auto;
      height: auto;
      bottom: -20%;
      right: -10%;
      z-index: 3;

      transform: rotateY(15deg);
    }

    @media screen and (min-width: 1280px) {
      width: auto;
      height: auto;
      bottom: -5%;
      right: -10%;
      z-index: 3;

      transform: rotateY(15deg);
    }
  }

  .circle1 {
    display: none;

    @media screen and (min-width: 728px) {
      display: block;

      position: absolute;
      bottom: 10%;
      left: 10%;
      z-index: 3;
    }
  }

  .circle2 {
    display: none;

    @media screen and (min-width: 728px) {
      display: block;

      position: absolute;
      top: 50%;
      left: 5%;
      z-index: 3;
    }
  }

  .circle3 {
    position: absolute;
    top: 10%;
    right: 90%;
    z-index: 3;

    width: 19px;
    height: 19px;

    @media screen and (min-width: 728px) {
      width: auto;
      height: auto;
      top: 20%;
      right: 30%;
      z-index: 3;
    }
  }

  .circle4 {
    display: none;

    @media screen and (min-width: 728px) {
      display: block;

      position: absolute;
      bottom: 30%;
      right: 15%;
      z-index: 3;
    }
  }
`;
