import styled from 'styled-components';

export const StyledTestsStatusList = styled.div`
  .study-title-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    row-gap: 15px;
    button {
      width: 100%;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--base-color);
    }
    @media screen and (min-width: 768px) {
      flex-direction: row;
      button {
        width: max-content;
      }
    }
  }
  .study-status {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    padding: 19px;

    border: 1px solid var(--gray);
    border-radius: 20px;
    background: var(--white);

    box-shadow: var(--box-shadow);

    @media screen and (min-width: 728px) {
      padding: 24px 44px 37px;
    }
  }

  .study-title {
    font-family: var(--primary-font);
    font-size: 1.11112rem;
    line-height: normal;
    font-weight: 700;

    @media screen and (min-width: 728px) {
      font-size: 1.66667rem;
    }
  }

  .status-inner {
    display: flex;
    width: 100%;
    gap: 10px;
    flex-direction: column;
    @media screen and (min-width: 768px) {
      justify-content: end;
    }
  }

  .study-list {
    display: flex;
    align-items: center;

    flex-wrap: wrap;
    gap: 17px;
  }

  .study-badge {
    max-height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px;

    border: 1px solid var(--gray);
    border-radius: 10px;
    background: var(--white);

    box-shadow: var(--box-shadow);
    position: relative;
    @media screen and (min-width: 768px) {
      max-height: 74px;
      flex-wrap: nowrap;
    }
  }

  .remove-btn {
    
    @media screen and (min-width: 768px) {
      position: relative;
      top: 0px;
      transform: translateY(0%);
      right: 0px;
    }
  }

  .study-subject {
    font-family: var(--primary-font);
    font-size: 0.88888888rem;
    line-height: normal;
    font-weight: 700;
    color: var(--base-color);

    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 80%;

    @media screen and (min-width: 768px) {
      font-size: 1.66667rem;
      width: 100%;
    }
  }

  .study-subject-status {
    font-size: 0.777777rem;
    font-weight: 600;
    line-height: normal;
    width: 100%;
    color: var(--black);

    @media screen and (min-width: 768px) {
      font-size: 1.11112rem;
      font-weight: 700;
      width: max-content;
    }
  }

  .take_test_btn {
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--base-color);
    min-height: 24px !important;
    font-size: .7777777rem;
    box-shadow: 0 5px 5px 0 rgba(58, 105, 179, 0.25) !important;
    border: 1px solid var(--gray);
    padding: 0 10px;
    transition: .3s;
    &:hover{
      color: var(--accent-color);
      border: 1px solid var(--accent-color);
    }
    @media screen and (min-width: 768px) {
      height: 45px;
      font-size: 1.1111111rem;
    }
    &.hidden-desktop{
      @media screen and (min-width: 768px) {
        display: none;
      }
    }
    &.hidden-mobile{
      @media screen and (max-width: 767px) {
        display: none;
      }
    }
  }
  .status-btn-inner{
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
