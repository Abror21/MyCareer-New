import styled from 'styled-components';

export const StyledCreateCvModals = styled.div`
  .personal-data-spinner{
    max-height: unset !important;
    &::before{
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: white;
      opacity: 0.8;
    }
    .ant-spin-dot{
      .ant-spin-dot-item{
        background-color: #4baf74;
        opacity: 1;
      }
    }
  }
  
  background-color: var(--white, #fff);
  padding-bottom: 20px;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid var(--grey, #cdd7e4);
  transition: 0.5s ease;
  position: relative;

  h1,
  h2 {
    text-transform: capitalize;
  }

  .navigation {
    display: flex;
    justify-content: space-between;
    height: 80px;
    opacity: 0;
    visibility: hidden;
    width: auto;
    position: absolute;
    z-index: 9;
    &.active {
      width: 100%;
      opacity: 1;
      visibility: visible;
      z-index: 1;
      position: initial;
    }
    & > div {
      position: absolute;
      height: 80px;
      bottom: 20px;
      z-index: 9;
    }
    .right {
      right: 30px;
    }
    svg {
      cursor: pointer;
    }
    .left {
      transform: rotate(180deg);
      left: 30px;
    }
    .create-cv-save-btn {
      bottom: 38px;
      display: flex;
      width: 114px;
      height: 45px;
      padding: 4px 15px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      right: 30px;
      position: absolute;
      border-radius: 28px;
      min-height: auto;
      span {
        font-family: inherit;
        font-size: 1.11112rem;
        line-height: 1.27778rem;
        font-style: normal;
        font-weight: 700;
      }
    }
    @media screen and (max-width: 1280px) {
      .right {
        right: 0px;
      }
      .left {
        transform: rotate(180deg);
        left: 0px;
      }
    }
  }

  .modals {
    padding: 60px 60px 20px;
    @media screen and (max-width: 720px) {
      padding: 40px 40px 20px;
    }
    @media screen and (max-width: 520px) {
      padding: 20px 20px 10px;
    }
    &-inner {
      display: flex;
      width: 300%;
      position: relative;
      transition: 0.4s ease;
      min-height: 200px;
      z-index: 998;
      @media screen and (max-width: 420px) {
        min-height: 300px;
      }
    }
  }

  .modal {
    transition: transform 0.5s ease;
    position: absolute;
    width: 33.3%;

    &.active {
      position: initial;
    }
  }

  /* Forms input style */
  .inputs-box {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 25px;

    @media screen and (max-width: 720px) {
      flex-direction: column;
      row-gap: 10px;
    }
  }

  .ant-picker {
    width: 100%;
    border-radius: 10px;
  }

  .inputs-box > div {
    width: 100%;
  }

  .ant-form-item {
    margin-bottom: 15px;
    &.checkbox {
      margin-bottom: 0px;
    }
    .ant-form-item-control {
      max-width: 100%;
    }

    .ant-form-item-label {
      text-align: start;
      max-width: 100%;
      label {
        font-family: var(--primary-font);
        font-size: 1.1111rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin-bottom: 8px;
        &::after {
          content: ' ';
        }
      }
    }

    .ant-row {
      display: block;
      row-gap: 20px;
    }
  }

  .checkbox {
    .ant-form-item-control {
      display: block;
      margin-inline-start: 0;
    }
  }

  .cv-loader {
    position: absolute;
    left: 30%;
    bottom: 60px;
    width: 50%;
    z-index: 1;
    .ant-spin .ant-spin-dot {
      inset-inline-start: 80%;
    }
  }
  .not-avilable-warning {
    color: var(--grey, #cdd7e4);
    font-size: 1rem;
    text-align: center;
    text-transform: none;
  }
`;
