import styled from 'styled-components';

export const StyledLanguageSwitcher = styled.div`
  form {
    @media screen and (min-width: 1280px) {
      max-width: 100px;
      min-width: 80px;
    }
  }
  .language-switcher {
    width: 100%;

    .ant-select-selector,
    .ant-select-borderless,
    .ant-select-selection-search,
    .ant-select-selection-item {
      color: ${({ theme }) => theme.antd.colorWhite} !important;
      font-family: var(--primary-font) !important;
    }

    .ant-select-selection-item {
      font-size: 1.11112rem !important;
      line-height: normal !important;
      color: ${({ theme }) => theme.antd.colorBlack};
      font-weight: ${({ theme }) => theme.antd.fontWeightMedium};

      @media screen and (min-width: 1280px) {
        font-weight: ${({ theme }) => theme.antd.fontWeightStrong};
        color: ${({ theme }) => theme.antd.colorWhite};
      }
    }

    #languageName input[aria-expanded='true'] {
      color: ${({ theme }) => theme.antd.colorWhite} !important;
    }

    .ant-select-arrow {
      display: none !important;
      color: ${({ theme }) => theme.antd.colorBlack};

      @media screen and (min-width: 1280px) {
        color: ${({ theme }) => theme.antd.colorWhite};
      }
    }

    .ant-select-item.ant-select-item-option.ant-select-item-option-active {
      background-color: ${({ theme }) => theme.antd.optionActiveBg};
    }

    .ant-select-dropdown {
      z-index: ${({ theme }) => theme.antd.zIndexPopupTop};
    }
  }
`;
