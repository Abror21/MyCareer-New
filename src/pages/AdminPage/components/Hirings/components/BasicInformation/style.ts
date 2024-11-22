import styled from 'styled-components';

export const StyledBasicInformation = styled.div`
  .basic-data {
    display: flex;
    flex-direction: column;
    row-gap: 80px;
  }
  .form-header,
  .form-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;
    .ant-form-item {
      width: 100%;
    }
  }
  .form-footer {
    display: flex;
    align-items: end;
    max-width: 30%;
    gap: 30px;
    .salary-container {
      display: flex;
      align-items: end;
      gap: 20px;
      .label-salary {
        .ant-form-item {
          margin-top: -5px;
        }
        .ant-form-item-required {
        }
      }
      .ant-form-item {
        width: 100%;
      }
      .ant-input-affix-wrapper {
        padding: 0px 10px;
      }
      .ant-form-item-explain-error {
        position: absolute !important;
      }
    }
    .ant-form-item {
      width: 60%;
    }
  }
  .contry-container {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    .ant-input-affix-wrapper {
      padding: 0px 10px;
    }
  }
  .form-item {
    max-width: 90%;
    min-width: 15%;
  }
  .next-btn {
    position: absolute;
    right: 0px;
    cursor: pointer;
  }
  .prev-btn {
    position: absolute;
    left: 0px;
    cursor: pointer;
  }
  .basic-data {
    .ant-form-item-explain-error {
      position: absolute !important;
    }
  }
`;
