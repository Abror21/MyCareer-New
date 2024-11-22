import styled from 'styled-components';
import heroBg from 'assets/images/Hero_countdown-bg.webp'
export const StyledHeroCountdown = styled.div`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: calc(100vh - var(--header-height));
  min-height: 530px;
  margin-top: var(--header-height);
  background-image: url(${heroBg});
  background-repeat: no-repeat;
  background-position: center;

  background-size: cover;

  .inner {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;

    position: absolute;
    left: 0;
    right: 0;
    z-index: 4;

    @media screen and (min-width: 1280px) {
      //padding-left: 305px !important;
    }
  }

  .title {
    text-align: center;
    display: inline-block;
    max-width: 865px;
    font-family: var(--primary-font);
    font-size: 2rem;
    line-height: normal;
    font-weight: 700;
    color: var(--white);

    position: relative;

    span {
      color: var(--accent-color);
    }

    &--started {
      max-width: 993px;
      font-size: 3.33334rem !important;

      @media(max-width: 900px) {
        font-size: 2.6rem !important;
      }
      @media(max-width: 728px) {
        font-size: 1.88889rem !important;
      }
    }

    @media screen and (min-width: 728px) {
      font-size: 3.88888rem;
    }
    @media screen and (min-width: 1280px) {
      font-size: 4.44445rem;
    }
  }

  .title-ru {
    text-align: center;
    display: inline-block;
    max-width: 1400px;
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

  .title-uz {
    text-align: center;
    display: inline-block;
    max-width: 750px;
    font-family: var(--primary-font);
    font-size: 2rem;
    line-height: normal;
    font-weight: 700;
    color: var(--white);

    span {
      color: var(--accent-color);
    }

    @media screen and (min-width: 728px) {
      font-size: 3.33334rem;
    }
  }

  .subtitle {
    font-size: 2rem;
    font-family: var(--primary-font);
    line-height: normal;
    font-weight: 700;
    color: var(--white);

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
    justify-content: center;
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
      bottom: -30%;
      right: -10%;
      z-index: 3;

      transform: rotateY(15deg);
    }

    @media screen and (min-width: 1537px) {
      bottom: -20%;
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

    @media screen and (min-width: 1230px) {
      bottom: 25%;
    }

    @media screen and (min-width: 1440px) {
      bottom: 30%;
    }
  }
`;
