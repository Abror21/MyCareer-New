import styled from 'styled-components';

export const StyledEducationForm = styled.div`
  .languages-form-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 17px;

    .labels {
      max-width: 851px;
      display: flex;
      gap: 30px;
      margin-bottom: -3px;

      h2 {
        color: var(--gray-600) !important;
        font-family: var(--default-font) !important;
        font-size: 1rem !important;
        font-style: normal;
        font-weight: 400;
        line-height: 1.1111rem;

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

      .select_input {
        @media screen and (min-width: 1024px) {
          min-width: 430px;
          max-width: 430px;
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
  .certificate_field {
    margin-top: 20px;
    width: 45%;
  }
`;
