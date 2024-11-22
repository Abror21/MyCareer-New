import styled from 'styled-components';

export const StyledInvoice = styled.div`
  .invoice {
    margin-top: 15px;
    h2 {
      font-family: var(--primary-font);
    }

    &__no {
      color: var(--gray-200) !important;
    }

    &__text {
      color: var(--gray-200) !important;
      word-break: break-word;
    }

    &__requisites {
      margin-top: 32px;

      strong {
        font-family: var(--primary-font);
      }
    }

    &__date {
      margin-bottom: 15px !important;
    }

    &__description {
      margin-top: 24px;
      margin-bottom: 24px;
    }

    &__footer {
      padding: 20px 0;

      display: flex;
      align-items: center;
      gap: 20px;
    }
  }

  .discount-input {
    height: auto;
    max-width: 80px;
    margin-right: 5px;
    text-align: center;
  }

  .invoice-total {
    border-top: 1px solid var(--gray-100);
    margin-top: 15px;
    padding-top: 10px;
  }

  .payment-details,
  .notes {
    textarea {
      min-width: 400px;
      max-width: 400px;
    }

    .ant-col {
      display: flex;
      flex-direction: column;
    }
  }

  .notes {
    margin-top: 25px;
  }

  .ant-table-thead {
    font-family: var(--primary-font);
  }

  .ant-table-cell-row-hover {
    background: none !important;
  }

  .logo {
    color: var(--black);
    height: auto;

    font-family: var(--logo-font);
    font-size: 1.66667rem;
    font-weight: 700;

    @media screen and (min-width: 728px) {
      font-size: 3.33334rem;
    }
  }

  strong {
    font-family: var(--primary-font);
  }
`;
