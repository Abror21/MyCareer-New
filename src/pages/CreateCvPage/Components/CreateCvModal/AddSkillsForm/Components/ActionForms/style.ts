import styled from 'styled-components';

export const StyledActionModal = styled.div`
  position: relative;

  /* action forms global style */
  .action-forms {
    .title {
      font-family: var(--primary-font);
      font-size: 1.875em;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 20px;
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
  }
  .action-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right-svg {
      transform: rotate(180deg);
      cursor: pointer;
    }
  }
`;
