import styled from 'styled-components';

export const StyledEditLanguagesForm = styled.div`
  .languages-form-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 17px;

    .labels {
      max-width: 751px;
      display: flex;
      gap: 30px;
      margin-bottom: -3px;

      h2 {
        width: 100%;

        font-family: var(--primary-font);
        font-size: 1.11112rem;
        line-height: 1.27778rem !important;
        font-weight: 700;

        @media screen and (min-width: 728px) {
          width: 270px;
        }
        @media screen and (min-width: 1024px) {
          min-width: 326px;
        }

        &:last-of-type {
          display: none;

          @media screen and (min-width: 728px) {
            display: block;
          }
        }

        &:before {
          display: inline-block;
          margin-inline-end: 4px;
          vertical-align: top;
          color: ${({ theme }) => theme.antd.colorIconError};
          font-size: 1rem;
          font-family: var(--ant-required-label-font);
          line-height: 1;
          content: '*';
        }
      }
    }

    .select-wrapper {
      display: flex;
      align-items: center;
      gap: 11px;
      max-width: 763px;
      margin-bottom: 10px;

      @media screen and (min-width: 728px) {
        align-items: flex-end;
        margin-bottom: 0;
      }

      .select-box {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;

        @media screen and (min-width: 728px) {
          flex-direction: row;
          gap: 22px;
        }

        @media screen and (min-width: 1024px) {
          width: max-content;
        }
      }

      .select {
        width: 100%;

        @media screen and (min-width: 1024px) {
          min-width: 330px;
          max-width: 330px;
        }
      }

      .level-select-wrapper {
        display: flex;
        gap: 22px;

        width: 100%;

        @media screen and (min-width: 1023px) {
          min-width: 330px;
          max-width: 330px;
        }
      }
    }
  }
`;
