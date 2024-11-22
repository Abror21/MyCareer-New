import styled from 'styled-components';

export const StyledEditSkillsSide = styled.div`
  .verified-span{
    min-width: 20px;
    min-height: 28px;
  }

  .ul-left-side {
    .ant-select-selector {
      border: none;
      min-width: 60px;
      background-color: transparent;
      color: var(--light-gray);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5556rem;
    }
    li {
      color: var(--black);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      font-weight: 500;
      @media (max-width: 419px) {
        gap: 10px;
      }
      .left-side-list-name {
        min-width: 100px;
        max-width: 100px;
        @media (max-width: 419px) {
          min-width: unset;
        }
      }
      .level-select {
        width: 180px;
        @media (max-width: 419px) {
          width: 152px;
        }
      }
      .remove-button {
        cursor: pointer;
        svg {
          width: 15px;
          fill: var(--base-color);
        }
      }
      
    }
  }
  .edit-skills {
    .ant-form-item-control {
      flex: none;
    }
  }
  .add-button {
      display: inline;
      cursor: pointer;
      color: var(--base-color);
      span {
        padding: 5px 0;
      }
    }
`;
