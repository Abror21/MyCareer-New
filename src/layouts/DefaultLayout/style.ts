import styled from 'styled-components';

export const StyledPage = styled.div`
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .ant-layout-content {
    width: initial !important;
  }

  .logo {
    display: inline-block;
    font-size: 1.66667rem;
    line-height: normal;
    font-weight: 700;

    @media screen and (min-width: 1280px) {
      font-size: 2.22222rem;
    }
  }

  .primary-btn {
    background: ${({ theme }) => theme.antd.colorPrimary};
  }

  .pagination {
    padding-top: 40px;

    .ant-pagination {
      display: flex;
      justify-content: center;
      gap: 4px;

      @media screen and (min-width: 1024px) {
        justify-content: flex-end;
      }
    }

    .ant-pagination-prev,
    .ant-pagination-next {
      width: 32px;
      height: 32px;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .ant-pagination-prev {
      transform: rotate(270deg);

      path {
        fill: var(--white);
      }
    }

    .ant-pagination-next {
      transform: rotate(90deg);

      path {
        fill: var(--white);

        transition: fill 0.4s;
      }

      &:hover {
        path {
          fill: var(--accent-color);
        }
      }
    }

    .ant-pagination-item {
      width: 32px;
      height: 32px;
      line-height: unset;

      border-radius: 100%;
      border: 2px solid var(--white);

      a {
        color: var(--white);
        font-weight: 500;
        padding: 0;
      }

      &:hover {
        border: 2px solid var(--accent-color);

        a {
          color: var(--accent-color);
        }
      }
    }

    .ant-pagination-item-active {
      a {
        color: var(--base-color);
        font-weight: 500;
      }
    }
  }
`;
