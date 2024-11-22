import styled from 'styled-components';

export const StyledActionModel = styled.div`
  position: relative;
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
  .tab-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px 0;
    button {
      border-radius: 5px !important;
      color: var(--base-color);
    }
  }
  .save-button {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    position: relative;
    gap: 50px;
    button {
      border-radius: 10px;
      color: var(--base-color);
    }
  }
  .right {
    position: absolute;
    right: 0px;
  }
  svg {
    cursor: pointer;
  }
  .left {
    transform: rotate(180deg);
    left: 0px;
  }
`;
