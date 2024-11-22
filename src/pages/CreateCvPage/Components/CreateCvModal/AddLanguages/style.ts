import styled from 'styled-components';

export const StyledAddLanguages = styled.div`
  padding: 0 70px;
  @media screen and (max-width: 1280px) {
    padding: 0;
  }
  @media screen and (max-width: 420px) {
    font-size: 16px;
  }
  .no-lang-warning {
    color: var(--gray);
    text-align: center;
    display: block;
    font-size: 1.1rem;
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    h2 {
      width: 53%;
      font-family: var(--primary-font);
      font-size: 1.1111em;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      display: flex;
      align-items: center;
      gap: 2px;
      span:first-child {
        display: inline-block;
        margin-inline-end: 4px;
        color: var(--ant-reqired-label-color);
        font-size: 1.3889rem;
        font-family: var(--ant-reqired-label-font);
        line-height: 1;
        height: 18px;
      }
      @media screen and (max-width: 520px) {
        width: auto;
      }
      &:first-child {
        width: 42%;
      }
    }
  }
  .selected-language-list {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    .language-list-item {
      display: flex;
      gap: 20px;
      .select-box {
        display: flex;
        width: 95%;
        gap: 20px;
        @media screen and (max-width: 620px) {
          flex-direction: column;
          row-gap: 10px;
          width: 80%;
        }
        @media screen and (max-width: 480px) {
          width: 75%;
        }
        > div {
          width: 100%;
          margin-bottom: 0px;
        }
      }
      .remove-btn {
        display: flex;
        padding: 11px;
        align-items: center;
        gap: 4px;
        border-radius: 12px;
        border: 1px solid var(--grey, #cdd7e4);
        background: var(--white, #fff);
        height: 43px;
        svg {
          width: 20px;
          fill: var(--base-color);
        }
      }
    }
  }

  .add-language-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
    margin: 20px 0;
    box-shadow: 1px 1px 5px 0px var(--shadow-box);
    padding: 8px 12px;
    border: 1px solid var(--grey, #cdd7e4);
    border-radius: 8px;
    cursor: pointer;
    span {
      color: var(--base-color);
      font-family: var(--default-font);
      font-size: 1.1111em;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5556rem;
    }
    svg {
      fill: var(--base-color);
      width: 12px;
    }
  }
`;
