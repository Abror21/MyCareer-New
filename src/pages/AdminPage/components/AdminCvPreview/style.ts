import styled from 'styled-components';

export const StyledAdminCvPreview = styled.div`
  margin-top: 100px;
  position: relative;
  .title-company {
    padding: 11px 0;
    font-size: 1.11111rem;
    line-height: 1.44rem;
    font-weight: 700;
    font-family: var(--primary-font);
  }
  .emptyText {
    font-size: 1rem;
    color: var(--grey, #cdd7e4) !important;
    font-weight: normal;
  }
  .emptyText-hobbi {
    margin-bottom: 20px;
  }
  .save-btn {
    height: 45px;
    min-width: 114px;
  }
  .ant-row {
    flex-direction: column;
  }
  .download-btn {
    position: absolute;
    top: 0.4px;
    right: -70px;
    z-index: 99;
    background-color: var(--white);
    box-shadow: 1px 1px 5px 0px var(--shadow-box);
    padding: 8px;
    cursor: pointer;
    border: 1px solid var(--gray);
    width: 70px;
    img {
      width: 100%;
    }
  }
  .pdf-btn,
  .docx-btn,
  .invoice-btn {
    position: absolute;
    z-index: 99;
    background-color: var(--white);
    box-shadow: 1px 1px 5px 0 var(--shadow-box);
    padding: 8px;
    cursor: pointer;
    border: 1px solid var(--gray);
    width: 70px;

    display: flex;
    justify-content: center;
    align-items: center;

    path,
    rect {
      transition: 0.3s;
    }

    svg {
      width: 50px;

      path,
      rect {
        fill: var(--base-color);
      }
    }

    &:hover {
      path,
      rect {
        fill: var(--accent-color);
      }
    }
  }
  .pdf-btn {
    top: 80.4px;
    right: -70px;
  }

  .docx-btn {
    top: 0.4px;
    right: -70px;
  }

  .invoice-btn {
    top: 160.4px;
    right: -70px;
  }

  .navigate-back {
    position: absolute;
    top: -60px;
    left: -20px;
    font-size: 1.2222rem;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  .cv-preview {
    max-width: 1104px;
    position: relative;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
    margin: auto;
  }
  .information-verified {
    margin: 60px auto;
    width: 1100px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .add-action-btn {
    margin: 20px 0;
    button {
      height: 40px;
      border-radius: 12px;
    }
  }
  .cv-preview-header {
    display: flex;
    align-items: center;
    padding: 50px;
    background: var(--base-color);
    color: var(--white);
    .ant-avatar {
      width: 325px !important;
      height: 325px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        padding: 30px;
      }
    }
  }
  .user-information {
    font-family: var(--primary-font);
    ul {
      margin-left: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 345px;
      list-style: none;
      div {
        font-size: 20px;
        font-weight: 700;
        line-height: 1.4444rem;
      }
      li {
        margin: 8px 0;
        display: flex;
        justify-content: space-between;
        gap: 30px;
        button{
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          svg{
            margin: 0;
          }
        }
      }
      svg {
        margin-right: 10px;
        width: 16px;
        height: 16px;
        color: var(--white);
        stroke: var(--white);
        fill: var(--white);
      }

      .user-name {
        font-size: 2.2222rem;
        font-weight: 700;
        line-height: 2.7778rem;
      }
      .user-location {
        display: flex;
      }
    }
  }
  .cv-preview-body {
    display: flex;
    justify-content: space-between;
    min-height: 1000px;
  }
  .bar-title,
  .education-bar h4,
  .certificate-bar h4 {
    margin-bottom: 30px;
    font-family: var(--primary-font);
    font-size: 1.6667rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
  }
  .education-bar {
    display: flex;
    justify-content: space-between;
    height: 50px;
  }

  .verify-side {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 50px;
    justify-content: end;
    .ant-spin {
      margin: 0 15px;
    }
    svg {
      width: 15px;
      height: 15px;
    }
    .verify-icon {
      width: 25px;
      height: 20px;
    }
  }
  .textside {
    position: relative;
    font-weight: 400;
    .edit-btn {
      position: absolute;
      top: -10px;
      right: 10px;
      display: flex;
      gap: 10px;
      padding: 10px;
      width: 50px;
      height: 50px;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        .edit-icon {
          width: 100%;
          height: 100%;
        }
      }
      svg {
        fill: var(--base-color);
      }
    }
  }
  .block-information {
    margin-top: 50px;

    .titles {
      display: flex;
      justify-content: space-between;
      gap: 15px;
    }
    .list {
      display: flex;
      flex-direction: column;
      row-gap: 60px;

      .list-cv-preview {
        position: relative;
        .date {
          position: relative;
          bottom: -12px;
        }

        .action-buttons {
          position: absolute;
          top: -12px;
          right: 10px;
          display: flex;
          gap: 10px;
          button {
            padding: 10px;
            width: 50px;
            height: 50px;
            svg {
              fill: var(--base-color);
              &.delete-icon {
                width: 18px;
              }
            }
            span {
              display: flex;
              align-items: center;
              justify-content: center;
              .edit-icon {
                width: 80%;
                height: 80%;
              }
            }
          }
        }
      }
    }
  }
  .cv-preview-left-bar {
    width: 60%;
    background: var(--section-bg-color);
    padding: 30px 30px 50px 50px;
    position: relative;
    .status-dropdown {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 700;
      .icon {
        display: flex;
        align-items: center;
        transition: 0.4s ease;
        &.ant-dropdown-open {
          transform: rotate(180deg);
        }
        svg {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
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
        svg {
        }
        .left-side-list-name {
          min-width: 100px;
        }
        .level-select {
          width: 180px;
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
    .cv-preview-bar-ul {
      color: var(--light-gray);
      li {
        color: var(--black);
        display: flex;
        gap: 5px;
        .level-text {
          color: var(--light-gray);
        }
      }
    }
  }
  .btn {
    color: var(--white);
    background: var(--accent-color-semi-transparent);
    border: none;
    margin-top: 100px;
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    &:hover {
      color: white !important;
    }
  }
  .cv-preview-right-bar {
    width: 100%;
    padding: 30px 50px 80px 50px;
    font-weight: 700;
    color: var(--black);
    background-color: var(--white);
    .experience,
    .education {
      p {
        color: var(--Black, #070707);
        font-family: var(--default-font);
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
      }
      .title {
        font-family: var(--primary-font);
        font-style: normal;
        line-height: normal;
      }
    }
    .title {
      max-width: 534px;
      font-size: 1.1111rem;
      font-weight: 700;
      margin: 20px 0;
      display: flex;
      /* align-items: center; */
      justify-content: space-between;
      span {
        width: 90%;
      }
    }
  }

  .job-experience {
    font-size: 1rem;
    font-weight: 400;
    font-family: var(--default-font);
  }
  .edit-languages,
  .edit-skills {
    .ant-form-item-control {
      flex: none;
    }
  }
  .pdf-page {
    padding: 50px 0;
  }
`;

export const StyledModalForm = styled.div`
  && {
    textarea {
      height: 180px;
    }
  }
`;
export const StyledDropDownMenu = styled.div`
  /* padding: 8px 15px; */
  margin: 10px;
  font-family: var(--default-font);
  font-size: 1rem;
`;
