import styled from 'styled-components';

export const StyledAddSkills = styled.div`
  padding: 0 60px;
  @media screen and (max-width: 1280px) {
    padding: 0;
  }
  /* education and certificate forms style */
  .certificate-list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    overflow: hidden;
    min-height: 80px;
    @media screen and (max-width: 420px) {
      font-size: 16px;
    }
    .certificate-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      position: relative;
      @media screen and (max-width: 720px) {
        padding: 10px 0;
      }
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        box-shadow: 1px 1px 20px 0px var(--shadow-box);
        padding: 15px 20px;
        border-radius: 10px;
        border: 1px solid var(--grey, #cdd7e4);

        .left {
          width: 100%;
          h1 {
            font-family: var(--primary-font);
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
          display: flex;
          align-items: center;
          row-gap: 10px;
          flex-direction: column;
          .edit-svg {
            padding: 5px 8px 7px 11px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 12px;
            border: 1px solid var(--grey, #cdd7e4);
            box-shadow: 1px 1px 5px 0px var(--shadow-box);
            > svg {
              fill: var(--base-color);
              width: 25px;
              height: 28px;
            }
            @media screen and (max-width: 620px) {
              padding: 8px 10px 10px 13px;
            }
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
        padding: 10px 13px;
        height: 42px;
        &.mobile {
          display: none;
        }
        @media screen and (max-width: 620px) {
          &.mobile {
            display: block;
          }
          &.desktop {
            display: none;
          }
        }
        svg {
          fill: var(--base-color);
          width: 20px;
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
      fill: var(--base-color);
    }
  }

  /* action modal visible style */
  .action-modal {
    transition: 0.5s ease;
  }
  .action-modal-hidden {
    opacity: 0;
    visibility: hidden;
    position: absolute;
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
`;