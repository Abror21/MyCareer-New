import styled from 'styled-components';

export const StyledAdminSearch = styled.div`
  .admin-seachr-form {
    padding-bottom: 87px;
    border-bottom: 1px solid var(--gray-tritar);
  }
  .input-box {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: end;
    margin-bottom: 20px;
  }
  .first-line-input {
    max-width: 200px;
    width: 100%;
  }
  .second-line-input {
    max-width: 280px;
    width: 100%;
  }
  .action-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    > div {
      width: 100%;
    }
    button {
      width: 100%;
      min-width: 120px;
      height: 44px;
      border-radius: 10px;
      color: var(--blue-700);
      font-family: var(--default-font);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
    }
    .search-btn {
      background-color: var(--base-color);
      border-radius: 10px;
      button {
        width: 100%;
        min-width: 120px;
        height: 44px;
        border-radius: 10px;
        color: var(--blue-700);
        font-family: var(--default-font);
        /* display: none; */
        font-size: 0.7778rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.1111rem;
      }
      .search-btn {
        background-color: var(--base-color);
        border-radius: 10px;
        button {
          color: var(--white);
        }
        color: var(--white);
      }
    }
  }
  .ant-select-selection-overflow {
    display: flex !important;
    margin-right: 8px;
    flex-wrap: nowrap !important;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .ant-select-selection-overflow::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    cursor: pointer;
  }
  .ant-select-selection-overflow::-webkit-scrollbar-thumb {
    background-color: var(--base-color);
    border-radius: 6px;
  }
  .ant-select-selection-overflow::-webkit-scrollbar-track {
    background: none;
  }
  .ant-select-selection-item {
    font-family: var(--default-font) !important;
    color: var(--blue-700) !important;
    font-weight: 400 !important;
    font-size: 1rem !important;
  }
  .ant-select-selection-placeholder {
    font-family: var(--default-font) !important;
    color: var(--blue-700) !important;
    font-weight: 400 !important;
  }
  .ant-select-selection-item {
    font-family: var(--default-font) !important;
    font-size: 1rem !important;
    font-style: normal;
    font-weight: 400;

  }
  .ant-picker-input {
    input {
      color: var(--blue-700) !important;
    }
  }

  .ant-form-item {
    margin-bottom: 0;

    .ant-input,
    .ant-select,
    .ant-picker {
      border-radius: 10px;
      height: 44px;
      width: 100%;
    }
    .ant-form-item-control {
      max-width: 100%;
    }
    .ant-form-item-label {
      text-align: start;
      max-width: 100%;
      margin-bottom: 8px;
      label {
        color: var(--gray-600) !important;
        font-family: var(--default-font) !important;
        font-size: 1rem !important;
        font-style: normal;
        font-weight: 400;
        line-height: 1.1111rem;
      }
    }
    .ant-row {
      display: block;
    }

    .ant-picker {
      .ant-picker-input > input {
        width: 100%;
      }
    }
  }
`;
