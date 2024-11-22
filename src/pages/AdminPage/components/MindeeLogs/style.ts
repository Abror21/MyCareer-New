import styled from 'styled-components';

export const StyledMindeeLogs = styled.div`
    .admin-filters{
        padding-top: 0;
    }
    .ant-table-tbody{
      tr{
        cursor: pointer;
      }
    }
    .pagination-container {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        margin-top: 26px;
    }
    .ant-pagination-next {
        position: absolute;
        right: 0;
        button {
            color: var(--blue-700);
        }
    }
    .ant-pagination-prev {
        position: absolute;
        left: 0;
        button {
            color: var(--blue-700);
        }
    }
    .pagination-btn {
        margin-right: 8px;
        display: flex;
        padding: 10px 18px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 6px;
        border: 1px solid var(--gray-300);
        background: var(--white);
        font-size: 0.777777rem;
        span {
            font-family: var(--default-font);
            font-style: normal;
            font-weight: 500;
            line-height: 1.1111rem;
        }
    }
`;