import styled from 'styled-components';
import { token } from 'config/token';
import { Select } from 'antd';

export const StyledSelect = styled(Select)`
  && {
    width: 100%;
    height: ${token.inputHeight}px;
    font-size: 1rem;
    .rc-virtual-list-scrollbar-thumb {
      background-color: ${token.colorBase} !important;
    }
    .ant-select-dropdown {
      z-index: 99;
    }
    .ant-select-selection-item,
    .ant-select-selection-placeholder {
      font-family: var(--default-font);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
      color: var(--black);
    }
  }

  .cv-select .ant-select {
    border-radius: ${({ theme }) => theme.antd.borderRadiusLG} !important;
  }

  .cv-select .ant-select .ant-select-selector {
    border-radius: ${({ theme }) => theme.antd.borderRadiusLG} !important;
    border: 1px solid ${({ theme }) => theme.antd.colorBorder} !important;
  }
`;
