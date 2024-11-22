import styled from 'styled-components';
import CreateCvBg from 'assets/images/cv-background.png';

export const StyledPurchasePage = styled.div`
  background-image: url(${CreateCvBg});
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  margin-top: var(--header-height);
  padding: var(--main-top);
  padding-bottom: 100px;
  position: relative;
  .create_cv_icon {
    position: absolute;
    left: 50px;
    width: 50px;
    top: 180px;
  }
  .purchase-page {
    position: relative;
    width: 75%;
    margin: auto;
    max-width: 1350px;
    .ant-btn-primary {
      background-color: var(--accent-color);
    }
  }
  .title {
    font-size: 4.5em;
    font-style: normal;
    font-weight: 700;
    margin: 20px 0 60px 0;
    font-family: var(--primary-font);
    color: var(--white);

    line-height: 91px;

    > span {
      color: var(--Green, var(--White, #55ca85));
    }
  }
  .purchase-modal {
    background-color: var(--white, #fff);
    padding-bottom: 20px;
    overflow: hidden;
    border-radius: 20px;
    border: 1px solid var(--grey, #cdd7e4);
    transition: 0.5s ease;
    padding: 60px;
    @media screen and (max-width: 1556px) {
      padding-top: 80px;
    }
    @media screen and (max-width: 720px) {
      padding: 40px;
    }
    @media screen and (max-width: 520px) {
      padding: 20px;
    }
    @media screen and (max-width: 420px) {
      width: 100%;
    }
  }
  .card {
    border-color: var(--gray);
    fill: var(--white, #fff);
    height: 100%;
    filter: drop-shadow(1px 1px 15px var(--shadow-box));
    &-title {
      display: flex;
      gap: 10px;
      align-items: center;
      @media screen and (max-width: 450px) {
        flex-direction: column;
      }
      svg {
        fill: var(--accent-color);
      }
      h1 {
        font-family: var(--default-font);
        font-size: 1.1111rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        font-family: var(--primary-font);
        span {
          color: var(--accent-color);
          font-size: 1.6667rem;
        }
      }
    }
    button {
      display: flex;
      max-width: 224px;
      width: 100%;
      height: 45px;
      padding: 6.4px 15px;
      justify-content: center;
      align-items: center;
      margin: 20px 0;
      border-radius: 28px;
      .text {
        font-family: var(--primary-font);
        font-size: 1.11111rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
      }
    }
    .active-btn {
      background: var(--base-color) !important;
    }

    .list {
      &-second {
        padding-left: 23px;
        @media screen and (max-width: 990px) {
          padding-left: 0;
        }
      }
      &-title {
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 155.556%;
      }
      &-content {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
      }
      &-item {
        display: flex;
        align-items: start;
        gap: 7px;
        justify-content: space-between;
        .check-mark-icon {
          stroke: var(--accent-color);
          width: 25px;
          height: 13px;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: start;
        }
        span {
          font-size: 1rem;
          font-style: normal;
          font-weight: 400;
          line-height: 155.556%;
          width: 98%;
        }
      }
    }
  }
  .go-cabinet-btn {
    display: flex;
    max-width: 224px;
    width: 100%;
    height: 45px;
    padding: 6.4px 15px;
    justify-content: center;
    align-items: center;
    margin: 0px auto;
    margin-right: 0;
    margin-top: 40px;
    cursor: pointer;
    &.disabled {
      background-color: var(--section-bg-color);
    }
    @media screen and (max-width: 480px) {
      bottom: -92px;
      font-size: 0.8889rem;
      padding: 4px 25px;
      width: auto;
    }
  }

  .card-5{
    .card-title{
      flex-wrap: wrap ;
    }
  }
  .purchase-list-description,
  .purchase-list-title{
    padding: 10px 0;
  }
`;
