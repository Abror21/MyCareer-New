import styled from 'styled-components';

export const StyledTable = styled.div`
  .ant-table-body {
    table {
      max-width: 727px !important;
    }
  }
  .ant-table-header {
    background: var(--light-blue);
  }
  .ant-table-body::-webkit-scrollbar-thumb {
    background: var(--light-blue);
    border-radius: 8px;
  }
  .ant-table-body::-webkit-scrollbar {
    width: 8px;
  }

  .ant-table-cell-scrollbar {
    display: none !important;
  }
  .table-history {
    box-shadow: 0 0 4px var(--gray);
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 20%;
    z-index: 9;
    border-radius: 8px;
  }
  .history-blur {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000042;
    z-index: 8;
  }
  table {
    margin: 0px;
    max-width: 710px;
    max-height: 30px;
  }
  .table-inner {
    position: relative;
    .close-btn {
      position: absolute;
      z-index: 99;
      top: 8px;
      cursor: pointer;
      right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;

      .close-icon {
        width: 10px;
        height: 10px;
        path {
          fill: var(--black-secondary);
        }
      }
    }
  }

  thead {
    background: var(--light-blue) !important;
    .thead-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        border: none;
        background: none;
        box-shadow: none;
        width: 10px;
        height: 10px;
      }
    }
    tr {
      min-height: 40px;
      align-self: stretch;
      align-items: center;

      th {
        background: var(--light-blue) !important;
        width: calc(710px / 3);
        font-size: 0.666666rem;
        padding: 14px 22px;
        font-style: normal;
        font-weight: 400 !important;
        line-height: normal;
        letter-spacing: 0.72px;
        text-transform: uppercase;
        font-family: var(--default-font);
      }
    }
  }
  .ant-table-cell {
    &::before {
      display: none !important;
    }
  }

  .ant-table-body {
    display: flex;
    flex-direction: column-reverse;
  }

  tbody {
    .ant-table-placeholder {
      max-height: 104px;
      td {
        padding: 0;
        height: 104px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    tr:nth-child(even) {
      background-color: var(--white-tritar);
    }

    tr:nth-child(odd) {
      background-color: var(--white);
    }

    tr {
      display: flex;
      justify-content: center;
      align-self: stretch;
      align-items: center;

      td {
        width: calc(710px / 3);
        font-size: 0.777777rem;
        padding: 14px 22px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        font-family: var(--default-font);
      }
    }
  }
`;
