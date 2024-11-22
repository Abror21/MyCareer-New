import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledCompanyInformtion = styled(Modal)`
  @media screen and (max-width: 768px) {
    min-width: 100% !important;
    padding: 24px;
  }
  .ant-modal-body {
    padding: 20px;
  }
  .modal-header {
    display: flex;
    align-items: end;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 12px;
    min-height: 200px;

    .image-wrap {
      min-height: 100%;
    }

    .image-container {
      width: 200px;
      height: 200px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }

    .company-name {
      font-size: 1rem;
      font-weight: bold;
      color: var(--base-color);
    }
  }

  .ant-modal-close {
    top: 16px;
    right: 16px;
  }

  .modal-body {
    padding-top: 16px;
    color: #555;

    .company-info {
      display: flex;
      gap: 20px;
      font-size: 1rem;
      color: var(--black);

      p {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }

    .company-link {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 1rem;
      color: var(--black);
      a {
        color: var(--base-color);
      }
    }

    .company-body {
      margin-top: 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
      row-gap: 5px;
    }
    .industry-container {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--black);

      .industry {
        display: inline-block;
        line-height: 1.5;
        white-space: normal;
        word-break: break-word;
        margin-top: 2px;
      }
    }

    .company-description {
      margin-top: 16px;
      line-height: 1.5;
      transition: 3s;
    }

    .preview-text {
      max-height: 60px;
      overflow: hidden;
      transition: max-height 0.5s ease-in-out;
    }

    .more-text {
      max-height: 50rem;
    }

    .show-more-button {
      background: none;
      border: none;
      color: #007bff;
      cursor: pointer;
      padding: 0;
      font-size: 0.9em;
      margin-top: 10px;
    }

    .company-operations {
      margin-top: 12px;
      color: var(--black);
    }
  }

  .modal-footer {
    margin-top: 16px;
    text-align: center;
  }

  .industry-svg {
    min-height: 18px;
    min-width: 18px;
  }

  @media (min-width: 600px) {
    .ant-modal-content {
      padding: 24px;
    }

    .modal-header .company-name {
      font-size: 1.333333rem;
    }
  }
`;
