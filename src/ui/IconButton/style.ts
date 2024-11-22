import styled from 'styled-components';
import { Button } from 'antd';

export const StyledIconButton = styled(Button)`
  width: 42px !important;
  height: 42px !important;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    width: 18px;
    height: 18px;
    margin: 0 60px;

    .svg {
      width: 100%;
      height: 100%;
      object-fit: contain;

      path {
        fill: var(--base-color);
        transition: fill 0.3s;
      }
    }
  }

  &:hover {
    .svg {
      path {
        fill: var(--accent-color);
      }
    }
  }

  &.danger {
    .icon {
      .svg {
        path {
          fill: ${({ theme }) => theme.antd.colorIconError};
          transition: fill 0.3s;
        }
      }
    }

    &:hover {
      .svg {
        path {
          fill: ${({ theme }) => theme.antd.colorIconErrorHover};
        }
      }
    }
  }
`;
