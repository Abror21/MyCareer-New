import styled from 'styled-components';

export const StyledHiringTable = styled.div`
  padding-top: 15px;

  thead {
    .ant-table-cell {
      background: var(--white) !important;
    }
    .ant-table-cell::before {
      display: none !important;
    }
    th {
      color: var(--gray-600) !important;
      font-family: var(--default-font);
      font-size: 0.777777rem !important;
      font-style: normal;
      font-weight: 400 !important;
      line-height: 20px;
    }
  }
  tbody {
    .ant-table-cell {
      color: var(--blue-700) !important;
      font-size: 0.777777rem;
      font-family: var(--default-font);
    }
  }
  .ant-table-cell {
    color: var(--gray-600) !important;
  }
  .total {
    font-family: var(--primary-font);
    font-size: 1.11111rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.1111rem;
    color: var(--blue-700);
  }
  .table-action {
    svg {
      cursor: pointer;
    }
  }
  .sequence-container {
    transition: 3s;
    cursor: pointer;
  }
  .sequence-input {
    width: 60px;
  }
  .total {
    font-family: var(--primary-font);
    font-size: 1.11111rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.1111rem;
    color: var(--blue-700);
    margin-bottom: 30px;
  }
  .ant-table-cell {
    background: var(--white);
  }
`;
