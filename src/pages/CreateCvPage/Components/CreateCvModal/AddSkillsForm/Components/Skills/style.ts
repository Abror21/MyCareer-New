import styled from 'styled-components';

export const StyledSkills = styled.div`
  .skills-form {
    display: flex;
    gap: 20px;
    align-items: flex-end;
    .select-box {
      display: flex;
      gap: 20px;
      width: 100%;
      @media screen and (max-width: 620px) {
        flex-direction: column;
        row-gap: 20px;
      }
      label {
        font-family: var(--primary-font);
        font-size: 1.1111rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        display: flex;
        align-items: center;
        gap: 3px;
        span:first-child {
          display: inline-block;
          margin-inline-end: 4px;
          color: var(--ant-reqired-label-color);
          font-size: 1.3889rem;
          font-family: var(--ant-reqired-label-font);
          line-height: 1;
          height: 18px;
        }
      }
      .select {
        width: 100%;
        display: flex;
        height: 77px;
        flex-direction: column;
        row-gap: 10px;
      }
    }
    .add-btn {
      width: 50px;
      height: 40px;
      background-color: var(--white);
      border-radius: 10px;
      border: 1px solid var(--grey, #cdd7e4);
      background: var(--white, #fff);
      padding: 6.5px 8px;
      display: flex;
      align-items: center;
      box-shadow: 1px 1px 10px 0px var(--shadow-box);
      justify-content: center;
      cursor: pointer;
      margin-bottom: 3px;
      svg {
        fill: var(--base-color);
        width: 25px;
      }
    }
  }
  &:has(.ant-form-item-explain-error) {
    .selected-skills {
      margin-top: 30px;
    }
  }
  .selected-skills {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 10px 0;
    .skill-item {
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
      > span {
        color: rgba(7, 7, 7, 0.5);
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
          width: 10px;
          fill: var(--base-color);
        }
      }
    }
  }
`;
