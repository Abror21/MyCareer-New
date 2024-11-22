import styled from 'styled-components';

export const StyledJobsFilter = styled.div`
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    .ant-form-item {
      width: 100%;
    }
  }
  .ant-form-item-label {
    text-align: start;
    max-width: 100%;
    label {
      color: var(--gray-600) !important;
      font-family: var(--default-font) !important;
      font-size: 1rem !important;
      font-style: normal;
      font-weight: 400;
      line-height: 1.1111rem;
    }
  }
`;
