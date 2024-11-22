import { styled } from 'styled-components';

export const StyledDetailsForm = styled.div`
  .details-container {
    margin: 20px 0;
  }

  .image-checkbox {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .date-container {
    width: 100%;
    margin: 20px 0;
    .ant-picker {
      border-radius: 8px;
    }
  }
  .organization-image {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  .upload {
    cursor: pointer;
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
  .filter-image {
    filter: brightness(60%);
    cursor: not-allowed;
  }
  .image-action {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    position: relative;
    .remove-btn {
      z-index: 1;
      top: 0;
      right: -30px;
      position: absolute;
      cursor: pointer;
    }
  }
  .sequence-input {
    margin-bottom: 20px;
  }
`;
