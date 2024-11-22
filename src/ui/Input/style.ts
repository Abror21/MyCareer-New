import styled from 'styled-components';
import { token } from 'config/token';
import { Form, Input } from 'antd';

export const StyledFormInput = styled(Form.Item)`
  input {
    height: ${token.inputHeight}px;
    font-size: 1rem;
    color: var(--text-color);
    font-family: var(--default-font);
    font-style: normal;
    font-weight: 500;
    line-height: 1.55556rem;
    width: 100%;

    &::-webkit-input-placeholder {
      font-family: var(--default-font);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.55556rem;
      color: var(--text-color);
    }
  }
  .ant-form-item-explain-error {
    font-size: 0.8889rem;
  }

  .cv-input {
    font-size: 1rem;
    border-radius: 10px;
    border: 1px solid var(--gray);

    label {
      font-size: 1.11112rem !important;
      line-height: 1.55556rem !important;
      font-weight: 700 !important;
    }
  }

  .admin-input {
    font-size: 1rem;
    border-radius: 6px;

    .ant-form-item-control {
      height: 44px !important;

      span {
        height: 44px !important;
      }
    }
  }
`;
