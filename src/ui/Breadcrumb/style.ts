import styled from 'styled-components';
import { Breadcrumb } from 'antd';

export const StyledBreadcrumb = styled(Breadcrumb)`
  .ant-breadcrumb-link {
    color: ${({ theme }) => theme.antd.itemColor};
    font-weight: ${({ theme }) => theme.antd.fontWeightBold} !important;
    text-transform: uppercase !important;
    letter-spacing: 0.25rem;

    a {
      color: ${({ theme }) => theme.antd.linkColor};

      &:hover {
        color: ${({ theme }) => theme.antd.linkHoverColor};
        background: transparent !important;
      }
    }
  }

  .ant-breadcrumb-separator {
    color: ${({ theme }) => theme.antd.separatorColor};
  }
`;
