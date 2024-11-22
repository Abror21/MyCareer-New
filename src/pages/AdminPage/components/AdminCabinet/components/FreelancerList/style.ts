import styled from 'styled-components';

export const StyledFreelancerList = styled.div`
  padding-top: 15px;
  .users-header{
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > button{
      margin-left: auto;
    }
  }
  .skill-column {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    &-item {
      display: flex;
      align-items: center;
      gap: 5px;
      .icon {

      }
      span {
        color: #3a70b3;
        font-family: var(--default-font);
        font-size: 0.8rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.1111rem;
      }
    }
  }
  .add-user-btn{
    border-radius: 5px;
  }
  .skill-column-item {
  }
  .status-column {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .icon {
    display: flex;
    align-items: center;
    transition: 0.4s ease;
    &.ant-dropdown-open {
      transform: rotate(180deg);
    }
    svg {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }

  .openBtn {
    display: flex;
    padding: 10px 14px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-family: var(--default-font);
    font-size: 0.7778rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.1111rem;
    border-radius: 6px;
    border: 1px solid #3a70b3;
    background: var(--base-color);
    color: var(--white);
    width: 53px;
  }
  .deleteBtn{
    font-family: var(--default-font);
    font-size: 0.7778rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.1111rem;
    border-radius: 6px;
  }
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
    .ant-table-cell:nth-child(7) {

      font-weight: 700;
    }
  }
  .ant-table-cell {
    color: var(--gray-600) !important;
  }
  .total{
    font-family: var(--primary-font);
    font-size: 1.11111rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.1111rem;
    color: var(--blue-700);
  }
`;
