import styled from 'styled-components';
import bg from 'assets/images/intern-cabinet-bg.jpg';

export const StyledInternCabinetPage = styled.section`
  a:hover {
    color: unset;
  }
  background: url(${bg}) no-repeat center center;
  background-size: cover;
  min-height: 100vh;

  margin-top: var(--header-height);

  .profile-inner {
    max-width: 912px;
    padding: 40px 0;
    margin: 0 auto;

    .ant-spin-container {
      display: flex;
      flex-direction: column;
      gap: 35px;
    }

    @media screen and (min-width: 1280px) {
      padding: 107px 0;
    }

    .profile-main {
      display: flex;
      flex-direction: column;
      gap: 30px;

      @media screen and (min-width: 1024px) {
        flex-direction: row;
        gap: 40px;
      }
    }

    .left {
      max-width: 325px;
      margin: 0 auto;

      @media screen and (min-width: 1024px) {
        margin: 0;
      }
    }

    .right {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 33px;
    }

    .image {
      width: 100%;
      max-height: 325px;
      aspect-ratio: 1 / 1;

      margin: 0 auto;

      border-radius: 20px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .intern-cabinet-avatar {
      width: 100%;
      max-height: 325px;
      aspect-ratio: 1 / 1;

      margin: 0 auto;
      overflow: hidden;

      border-radius: 20px;
      border: 1px solid var(--gray);
      background: var(--white);
      box-shadow: var(--box-shadow);

      .avatar-icon {
        width: 60%;
        height: 60%;

        @media screen and (min-width: 1024px) {
          width: 129px;
          height: 147px;
        }
      }

      .ant-avatar {
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (min-width: 728px) {
          width: 325px !important;
          height: 325px !important;
        }
      }
    }

    .ant-avatar-icon {
      background-color: var(--white);
    }

    .name {
      font-family: var(--primary-font);
      font-size: 2.22223rem;
      line-height: normal;
      font-weight: 700;
      padding-top: 36px;
      padding-bottom: 6px;
    }

    .email {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-top: 10px;

      font-family: var(--primary-font);
      font-size: 1.11112rem;
      line-height: 1.27778rem;
      font-weight: 700;
      word-break: break-all;
    }

    .email-icon {
      margin-top: 1px;
      height: 22px;
      svg {
        width: 20px;
        height: 16px;
        object-fit: contain;
      }
    }

    .cv-status-badge {
      width: 100%;
      max-width: 547px;
      min-height: 74px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 19px;

      border: 1px solid var(--gray);
      border-radius: 20px;
      background: var(--white);

      box-shadow: var(--box-shadow);

      @media screen and (min-width: 1024px) {
        width: 547px;
      }
    }

    .cv-status {
      display: flex;
      align-items: center;
      gap: 15px;

      @media screen and (min-width: 728px) {
        gap: 18px;
      }
    }

    .cv-status-label {
      font-family: var(--primary-font);
      font-size: 1.11112rem;
      line-height: normal;
      font-weight: 700;

      @media screen and (min-width: 728px) {
        font-size: 1.66667rem;
      }
    }

    .edit-cv {
      width: 32px;
      height: 30px;
      max-width: 32px;

      a {
        display: flex;
        justify-content: center;
        align-items: center;

        font-weight: 700;
      }

      svg {
        width: 100%;
        fill: var(--black);
      }

      path {
        transition: fill 0.4s;
      }

      &:hover {
        svg {
          fill: var(--accent-color);
        }
      }
    }

    .profile-talent-card {
      cursor: pointer;
    }

    .talent-card-border {
      border: 1px solid var(--gray);
      box-shadow: var(--box-shadow);
      border-radius: 20px;

      transition: all 0.4s;
      &:hover {
        border: 1px solid var(--accent-color);
      }
    }
    .action-buttons {
      width: 100%;
    }
    .links {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
    }

    .action-badge {
      width: 100%;
      height: 86px;

      padding: 24px;
      display: flex;
      align-items: center;
      gap: 15px;

      border: 1px solid var(--gray);
      border-radius: 20px;
      box-shadow: var(--box-shadow);
      background: var(--white);

      transition: all 0.4s;

      svg {
        width: 32px;
      }

      font-family: var(--primary-font);
      font-size: 1.11112rem;
      line-height: normal;
      font-weight: 700;

      path {
        transition: fill 0.4s;
        fill: var(--black);
      }

      &:hover {
        border: 1px solid var(--accent-color);
        color: var(--accent-color);

        path {
          fill: var(--accent-color);
        }
      }

      @media screen and (min-width: 728px) {
        font-size: 1.66667rem;
        line-height: 1.91667rem;
      }
    }
    .purchase-btn {
      color: var(--black);
      margin-top: 10px;
      text-align: center;
      &:hover {
        color: var(--accent-color);
      }
      &:hover {
        path {
          stroke: var(--accent-color);
          fill: none;
        }
      }
      svg {
        stroke: var(--black);
        fill: none;
        width: 32px;
        height: 35px;
        path {
          fill: none;
          stroke: var(--black);
          transition: all 0.4s;
        }
      }
    }
    .verified-icon {
      margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .cv-preview {
    margin: 0 auto;
    max-width: 1104px;
    padding-top: 60px;
    padding-bottom: 97px;
  }
`;
