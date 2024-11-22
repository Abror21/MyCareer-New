import styled from 'styled-components';

export const StyledActionForm = styled.div`
  .title {
    font-family: var(--primary-font);
    font-size: 1.66667rem;
    line-height: normal;
    font-weight: 700;
    padding: 20px 0;
  }
  .title-container {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .edit-btn {
    border: none;
    background: none;
    box-shadow: none;
  }
  .title-base {
    font-family: var(--primary-font);
    font-size: 1.11111rem;
    line-height: normal;
    font-weight: 700;
    padding: 20px 0;
  }
  .image-container {
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .upload {
    cursor: pointer;
  }
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 50px;

    .company-name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      .company-name-field {
        width: 100%;
      }
      .country-field {
        width: 40%;
      }
    }
    .form-container {
      width: 100%;
    }
    .image-action {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 20px;
      position: relative;
    }
  }
  .company-detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    flex: 1, 1, 200px;
  }
  .operation-country-field {
    width: 30%;
  }
  .remove-btn {
    z-index: 1;
    top: 0;
    right: -30px;
    position: absolute;
    cursor: pointer;
  }
  .description {
    margin: 30px 0;
  }
  .ant-picker {
    border-radius: 8px !important;
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
  .eployes-field {
    width: 20%;
  }
  .contact-person {
    font-family: var(--primary-font);
    font-size: 1rem;
    line-height: normal;
    font-weight: 700;
    padding: 0px 0 10px 0;
  }
  .save-button {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    button {
      border-radius: 10px;
      color: var(--base-color);
    }
  }
  .internal-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .internal-details-contact {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .company_legas_address {
    width: 40%;
  }
  .internal-fields {
    width: 25%;
  }
  .job-details {
    margin: 30px 0;
  }
  .email-field {
    width: 30%;
  }

  .ant-form-item-explain-error {
    position: absolute !important;
  }
`;
