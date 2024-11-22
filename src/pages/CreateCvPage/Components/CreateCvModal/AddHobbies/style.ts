import styled from 'styled-components';

export const StyledAddHobies = styled.div`
  padding: 30px 60px;
  @media screen and (max-width: 1280px) {
    padding: 0;
  }
  .form {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
    transition: 0s;

    &:has(.ant-form-item-explain-error) {
      align-items: center;
      button {
        margin-top: 12px;
      }
    }
    & > div:first-child {
      width: 100%;
      @media screen and (max-width: 450px) {
        width: 78%;
      }
    }
    button {
      padding: 0px 10px;
      align-items: center;
      display: flex;
      height: 40px;
      border-radius: 7px;    
      span {
        height: 27px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      svg {
        fill: var(--base-color);
        width: 20px;
      }
    }
    label {
      font-family: var(--default-font);
      font-size: 1.1111rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 15px;
    }

    .ant-form-item {
      margin-bottom: 0;
    }
  }

  .list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 10px 0;
    .list-item {
      display: flex;
      gap: 5px;
      border-radius: 5px;
      border: 1px solid var(--grey, #cdd7e4);
      background: var(--White, #fff);
      padding: 1px 8px;
      align-items: center;
      > p {
        color: var(--base-color);
        font-family: var(--default-font);
        font-size: 0.7778rem;
        font-style: normal;
        font-weight: 500;
        line-height: 200%;
      }
      .close-icon {
        cursor: pointer;
        display: flex;
        align-items: center;
        > svg {
          fill: var(--base-color);
          width: 10px;
        }
      }
    }
  }
`;
