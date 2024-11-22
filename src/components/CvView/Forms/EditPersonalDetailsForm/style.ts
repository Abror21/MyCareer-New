import styled from 'styled-components';

export const StyledPersonalDetailsForm = styled.div`
  .edit-personal-details-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    @media screen and (min-width: 1024px) {
      flex-direction: row;
      gap: 30px;
    }

    .edit-avatar {
      width: 100%;

      @media screen and (min-width: 1024px) {
        width: 40%;
      }
    }

    .edit-personal-details {
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: 10px;

      @media screen and (min-width: 1024px) {
        width: 60%;
      }
    }

    .top-block {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 30px;
    }

    .inputs-box {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
      width: 100%;

      @media screen and (min-width: 1024px) {
        flex-direction: row;
        gap: 30px;
      }
    }

    .input {
      width: 100%;
    }

    .experience-input {
      margin-top: 30px;

      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .ant-form-item-required {
      line-height: normal !important;
      font-weight: 700 !important;
      color: var(--black);

      @media screen and (min-width: 728px) {
        font-size: 1.11112rem !important;
        line-height: 1.55556rem !important;
      }
    }

    .boolean-input {
      visibility: unset;
      opacity: 0;
      z-index: -1;
    }
  }
`;
