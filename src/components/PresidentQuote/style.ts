import styled from 'styled-components';
import expImg from 'assets/images/expansionTargets_bg.webp';
import expImgMobile from 'assets/images/expansionTargets_bg-mobile.webp';

export const StyledPresidentQuote = styled.div`
  background: url(${expImgMobile}) no-repeat center center;
  min-height: 400px;
  background-size: cover;
  color: white;
  font-size: 9px;
  padding-top: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media screen and (min-width: 728px) {
    height: 500px;
    background: url(${expImg}) no-repeat;
    background-position: center;
    background-size: cover;
    font-size: 11px;
    overflow: hidden;
    padding: 40px 0;
  }

  @media screen and (min-width: 1280px) {
    font-size: 16px;
    height: 600px;
    padding: 100px 0;
  }
  .president_quote-inner {
    display: flex;
    flex-direction: column;
    row-gap: 50px;
    @media screen and (min-width: 728px) {
      flex-direction: initial;
      gap: 60px;
      justify-content: space-between;
    }
    @media screen and (min-width: 1280px) {
      gap: 100px;
    }
  }
  .left-side {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    @media screen and (min-width: 728px) {
      width: 70%;
    }
  }
  .left-side h3 {
    line-height: 140%;
    font-size: 2.5em;
    font-family: var(--primary-font);
    font-style: normal;
    font-weight: 700;
  }
  .left-side h4 {
    line-height: 140%;
    font-size: 1.875em;
    font-family: var(--primary-font);
    font-style: normal;
    font-weight: 700;
    width: 80%;
  }
  .right-side {
    @media screen and (min-width: 528px) {
      width: 60%;
    }
    @media screen and (min-width: 728px) {
      width: 40%;
    }
    .text,
    .link {
      font-size: 1.8em;
      font-family: var(--default-font);
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      @media screen and (min-width: 728px) {
        font-size: 1.2em;
        line-height: 140%;
      }
    }
  }
  .right-side .link {
    color: #55ca85;
  }
  .quote-svg {
    position: absolute;
    left: 8%;
    top: 15%;
    display: none;
    @media screen and (min-width: 728px) {
      display: block;
    }
  }
`;
