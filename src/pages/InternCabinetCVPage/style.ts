import styled from 'styled-components';
import bg from 'assets/images/intern-cabinet-bg.jpg';

export const StyledInternCabinetCVPage = styled.section`
  background: url(${bg}) no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  margin-top: var(--header-height);

  .profile-inner {
    max-width: 912px;
    padding: 40px 0;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 44px;

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
      font-family: Barlow, sans-serif;
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

      font-size: 1.11112rem;
      line-height: normal;
      font-weight: 700;
      word-break: break-all;
    }

    .email-icon {
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
      max-height: 74px;

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
      font-family: Barlow, sans-serif;
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

    .study-status {
      width: 100%;
      max-width: 547px;

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
      font-family: Barlow, sans-serif;
      font-size: 1.11112rem;
      line-height: normal;
      font-weight: 700;

      @media screen and (min-width: 728px) {
        font-size: 1.66667rem;
      }
    }

    .study-list {
      display: flex;
      flex-direction: column;
      gap: 17px;
    }

    .study-badge {
      width: 100%;
      max-width: 414px;
      max-height: 64px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px;

      border: 1px solid var(--gray);
      border-radius: 10px;
      background: var(--white);

      box-shadow: var(--box-shadow);
    }

    .study-subject {
      font-family: Barlow, sans-serif;
      font-size: 1.11112rem;
      line-height: normal;
      font-weight: 700;
      color: var(--base-color);

      display: flex;
      align-items: center;
      gap: 16px;

      @media screen and (min-width: 728px) {
        font-size: 1.66667rem;
      }
    }

    .study-subject-status {
      font-size: 1rem;
      font-weight: 600;
      line-height: normal;

      @media screen and (min-width: 728px) {
        font-size: 1.11112rem;
        font-weight: 700;
      }
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
    .connect-title {
      font-family: Barlow, sans-serif;
      font-size: 1.33334rem;
      line-height: normal;
      font-weight: 700;

      padding-bottom: 15px;

      @media screen and (min-width: 728px) {
        font-size: 1.66667rem;
      }
    }

    .connect-links {
      display: flex;
      flex-direction: column;
      gap: 20px;

      @media screen and (min-width: 1024px) {
        flex-direction: row;
      }
      @media screen and (min-width: 1230px) {
        gap: 54px;
      }
    }

    .connect-badge {
      width: 100%;
      max-width: 429px;
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

      font-family: Barlow, sans-serif;
      font-size: 1.11112rem;
      line-height: normal;
      font-weight: 700;

      path {
        transition: fill 0.4s;
      }

      &:hover {
        border: 1px solid var(--accent-color);

        path {
          fill: var(--accent-color);
        }
      }

      @media screen and (min-width: 728px) {
        font-size: 1.66667rem;
        gap: 20px;
      }
    }

    .verified-icon {
      margin-top: 5px;
    }
  }

  .cv-preview {
    margin: 0 auto;
    max-width: 1104px;
    padding-top: 60px;
    padding-bottom: 97px;

    .back {
      font-size: 1.11112rem;
      font-weight: 700;

      margin-bottom: 10px;
    }
  }
`;
