import styled from 'styled-components';

export const StyledEditEducationForm = styled.div`
  padding: 0 60px;
  position: relative;
  @media screen and (max-width: 1280px) {
    padding: 0;
  }
  /* education and certificate forms style */
  .education-list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    overflow: hidden;
    min-height: 80px;
    @media screen and (max-width: 420px) {
      font-size: 16px;
    }
    .education-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      position: relative;
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        box-shadow: 1px 1px 20px 0px var(--shadow-box);
        padding: 15px 20px;
        border-radius: 10px;
        border: 1px solid var(--grey, #cdd7e4);
        @media screen and (max-width: 720px) {
          flex-direction: column;
          row-gap: 15px;
        }
        .left {
          h1 {
            font-family: var(--default-font);
            font-size: 1.1111em;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            span {
              font-family: var(--default-font);
              font-size: 0.6667em;
              font-style: normal;
              font-weight: 500;
              line-height: 1.5556rem;
              margin-left: 5px;
            }
          }
        }
        .right {
          padding: 5px 8px 7px 11px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
          border: 1px solid var(--grey, #cdd7e4);
          box-shadow: 1px 1px 5px 0px var(--shadow-box);
          @media screen and (max-width: 720px) {
            width: 160px;
          }
          @media screen and (max-width: 620px) {
            margin-right: 60px;
          }
          > svg {
            width: 25px;
            height: 28px;
          }
        }
      }
      .remove-btn {
        box-shadow: 1px 1px 5px 0px var(--shadow-box);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        border: 1px solid var(--grey, #cdd7e4);
        padding: 12px 8px;
        @media screen and (max-width: 620px) {
          position: absolute;
          right: 5%;
          padding: 12.5px;
          bottom: 17px;
        }
        > svg {
          width: 25px;
        }
      }
    }
  }
  .open-modal-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
    margin: 20px 0;
    box-shadow: 1px 1px 5px 0px var(--shadow-box);
    padding: 8px 12px;
    border: 1px solid var(--grey, #cdd7e4);
    border-radius: 8px;
    cursor: pointer;
    span {
      color: var(--base-color);
      font-family: var(--default-font);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 155.556%;
    }
    svg {
      width: 12px;
    }
  }

  /* action modal visible style */
  .action-modal {
    transition: 0.5s ease;
    padding-bottom: 50px;
  }
  .action-modal-hidden {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
  }
  .action-modal-visible {
    opacity: 1;
    position: initial;
    visibility: visible;
  }

  /* change style when action modal visible */
  .form {
    transition: 0.3s ease;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    &.active {
      position: initial;
      opacity: 1;
      visibility: visible;
    }
  }

  .cancel {
    display: flex;
    justify-content: end;
  }
  .save-btn {
    bottom: 5px;

  }
  .right-svg {
    transform: rotate(180deg);
    position: absolute;
    bottom: 8px;
    cursor: pointer;
  }
`;
