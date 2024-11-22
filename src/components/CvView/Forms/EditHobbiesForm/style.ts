import styled from 'styled-components';

export const StyledEditHobbiesForm = styled.div`
  .edit-hobbies-form {
    .select-wrapper {
      display: flex;
      align-items: flex-end;
      gap: 11px;
    }

    .select-box {
      display: flex;
      gap: 30px;

      width: 100% !important;
    }

    .select {
      width: 100% !important;
    }

    .tags-wrapper {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      row-gap: 8px;
      align-items: center;
      max-width: 763px;
    }
  }
  .ant-form-item-explain-error{
    position: absolute;
  }
`;
