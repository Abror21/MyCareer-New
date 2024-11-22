import styled from 'styled-components';

export const StyledTalentSelect = styled.div`
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .ant-form-item-row {
      display: block;
      align-items: start;
    }

    .ant-form-item-label {
      text-align: start;
    }

    label {
      margin-top: 10px;
      color: var(--white) !important;
      font-size: 1.11112rem !important;
      line-height: 1.446666rem !important;
      font-weight: 700;
      text-align: start !important;
    }

    .ant-select {
      width: 100%;
    }

    .ant-select-selection-placeholder {
      color: var(--black);
    }

    .ant-select-item-option {
      &:hover {
        background-color: ${({ theme }) => theme.antd.optionActiveBg};
      }
    }

    .ant-select-item.ant-select-item-option.ant-select-item-option-active {
      background-color: ${({ theme }) => theme.antd.optionActiveBg};
    }

    .rc-virtual-list-scrollbar-thumb {
      background: var(--base-color) !important;
    }

    .ant-select-selection-placeholder {
      font-size: 1rem !important;
      line-height: 1.55556rem !important;
      font-weight: 500 !important;
      color: var(--text-color) !important;
    }

    @media screen and (min-width: 728px) {
      flex-direction: row;
      gap: 30px;
      flex-wrap: wrap;
    }
    @media screen and (min-width: 1024px) {
      justify-content: space-between;
    }
  }

  .select-input {
    width: 100%;
    min-width: 280px;
    height: 44px;

    border-radius: 10px;

    @media screen and (min-width: 728px) {
      max-width: 280px;
    }
  }
  padding-bottom: 12px;
`;
