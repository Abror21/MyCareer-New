import styled from 'styled-components';

export const StyledUploadFile = styled.div`
  .upload-file {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    align-items: flex-start;
    margin: 0 20px 30px 0;
    @media screen and (min-width: 768px) {
      display: flex;
      flex-direction: row;
      gap: 15px;
      justify-content: center;
      align-items: flex-start;
      margin: 0 20px 30px 0;
    }
    & > button.ant-btn {
      height: auto;
      border-radius: 10px !important;
      min-height: 42px !important;
    }
    &__uploader {
      .ant-upload {
        button.ant-btn {
          font-size: 0.666666rem;
          border-radius: 8px !important;
          padding: 7px 11px;
          height: auto;
          @media screen and (min-width: 768px) {
            font-size: 1rem;
          }
        }
      }
      .ant-tooltip {
        display: none;
      }
    }
  }
  .upload-file__underline {
    margin-bottom: 15px;
  }

  .ant-upload-list-item-name{
    font-size: .777777rem;
    margin-bottom: 0px;
    @media screen and (min-width: 768px) {
        font-size: 1rem;
    }
  }
`;
