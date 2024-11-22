import styled from 'styled-components';

export const StyledActionModalForms = styled.div`
  transition: 0.4s ease;
  .action-form-inner,
  .form-antd {
    width: 80%;
    margin: auto;
    @media screen and (max-width: 520px) {
      width: 95%;
    }
  }
  .action-form-title {
    font-family: var(--primary-font);
    font-size: 1.6667rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 20px;
    text-transform: capitalize;
  }
  .checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    > div {
      height: 5px;
    }
    input {
      color: var(--base-color);
      width: 15px;
      height: 15px;
      margin: 0;
    }
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right-svg {
      transform: rotate(180deg);
      cursor: pointer;
    }

    .text {
      font-size: 1.1111rem;
      font-weight: 700;
    }
    button {
      padding: 0.8571428571428577px 30px;
      height: 35px !important;
      min-width: 104px;
      span {
        font-size: 1.1111rem;
        height: 22px;
      }
    }
  }
  .save-btn {
    position: absolute;
    bottom: 15px;
    right: 20px;
    button {
      height: 35px !important;
      min-width: 104px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    span {
      font-size: 1.1111rem;
      font-weight: 700;
    }
    @media screen and (max-width: 520px) {
      right: 5px;
    }
  }

  .inputs-box {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 25px;
    @media screen and (max-width: 720px) {
      flex-direction: column;
      row-gap: 10px;
    }
    .input {
      width: 100%;
    }
    .textarea {
      width: 100%;
      display: block;
    }
  }

  /* new form styles for action form */
  .ant-picker {
    width: 100%;
    border-radius: 10px;
  }
  .inputs-box {
    > div {
      width: 100%;
    }
  }
  .ant-form-item {
    margin-bottom: 25px;
    .ant-picker-dropdown {
      z-index: 2060;
    }
    .ant-form-item-control {
      max-width: 100%;
    }
    .ant-form-item-label {
      text-align: start;
      max-width: 100%;
      label {
        font-family: var(--primary-font);
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5556rem;
      }
    }
    .ant-row {
      display: block;
      row-gap: 20px;
    }
  }
  .ant-checkbox {
    font-family: var(--default-font);
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5556rem;
  }
  .checkbox {
    .ant-form-item-control {
      display: block;
      margin-inline-start: 0;
    }
  }
`;
