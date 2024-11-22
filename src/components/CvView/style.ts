import styled from 'styled-components';

export const StyledCvCard = styled.div`
  position: relative;

  .cv-wrapper {
    max-width: 1104px;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
    margin: auto;

    .ant-avatar-icon {
      background-color: var(--white);
    }

    .cv-header {
      position: relative;

      display: flex;
      flex-direction: column;
      padding: 30px;

      background: var(--base-color);
      color: var(--white);

      .ant-avatar {
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (min-width: 728px) {
          width: 250px !important;
          height: 250px !important;
        }
        @media screen and (min-width: 1280px) {
          width: 280px !important;
          height: 280px !important;
        }

        svg {
          width: 60%;
          height: 60%;
          @media screen and (min-width: 1024px) {
            width: 129px;
            height: 147px;
          }
        }
      }

      .imageWrapper {
        .ant-avatar {
          @media screen and (min-width: 1280px) {
            width: 325px !important;
            height: 325px !important;
            img {
              width: 60%;
              height: 60%;
              @media screen and (min-width: 1024px) {
                width: 325px;
                height: 325px;
              }
            }
          }
        }
      }

      @media screen and (min-width: 728px) {
        align-items: center;
        text-align: center;
      }

      @media screen and (min-width: 1024px) {
        flex-direction: row;
        align-items: center;
        text-align: left;
        gap: 83px;

        padding: 57px 89px 60px;
      }

      .avatar-icon {
        @media screen and (min-width: 1024px) {
          width: 129px;
          height: 147px;
        }
      }
    }

    .job-experience-label {
      font-family: var(--primary-font);
      font-size: 1.11112rem;
      line-height: normal;
      font-weight: 700;
    }

    .job-experience-value {
      font-size: 1rem;
      line-height: 1.55556rem;
      font-weight: 400;
    }

    .user-information {
      position: relative;

      ul {
        display: flex;
        flex-direction: column;
        gap: 30px;

        div {
          font-size: 1.11112rem;
          font-weight: 700;
          line-height: normal;
        }

        li {
          gap: 10px;
          margin: 8px 0;
        }

        .user-name {
          margin-top: 40px;
          font-size: 1.44445rem;
          font-weight: 700;
          line-height: normal;
          padding-top: 20px;
          font-family: var(--primary-font);
          word-break: break-word;

          @media screen and (min-width: 728px) {
            font-size: 2.22223rem;
            line-height: 2.66667rem;
            padding-top: 0;
          }

          @media screen and (min-width: 1024px) {
            margin-top: 0;
          }

          .user-location {
            display: flex;
          }
        }
      }

      @media screen and (min-width: 1280px) {
        position: static;
      }
    }

    .position {
      font-size: 1.11112rem;
      line-height: normal;
      font-weight: 700;
      font-family: var(--primary-font);
    }

    .cv-contacts-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      inline-size: 100%;
      word-break: break-word;

      .cv-contacts-icon {
        margin-top: 2px;
        width: 14px;
        min-width: 14px;
      }

      svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
        fill: var(--white);
      }

      @media screen and (min-width: 728px) {
        justify-content: center;

        svg {
          width: 18px;
        }
      }

      @media screen and (min-width: 1024px) {
        justify-content: unset;
      }
    }

    .cv-contacts {
      font-family: var(--primary-font);
      font-size: 0.77778rem;
      font-weight: 500;
      line-height: normal;
      display: flex;

      @media screen and (min-width: 728px) {
        font-size: 1.11112rem;
        font-weight: 700;
        text-align: center;
      }

      @media screen and (min-width: 1024px) {
        text-align: unset;
      }
    }

    .avatar-information {
      margin-top: auto;
    }

    .avatar-position {
      font-size: 2.22223rem;
      line-height: normal;
      font-weight: 700;
      padding-bottom: 17px;
      padding-top: 40px;
      font-family: var(--primary-font);

      @media screen and (min-width: 728px) {
        font-size: 3.33334rem;
      }
      @media screen and (min-width: 1024px) {
        padding-top: 0;
      }
    }

    .cv-body {
      width: 100%;
      display: flex;
      flex-direction: column;

      @media screen and (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-between;
        min-height: 1000px;
      }
    }

    .cv-left-bar {
      width: 100%;
      background: var(--section-bg-color);
      padding: 20px;

      display: flex;
      flex-direction: column;
      gap: 60px;

      @media screen and (min-width: 728px) {
        padding: 50px;
      }
      @media screen and (min-width: 1024px) {
        width: 40%;
        padding: 77px 50px 50px 50px;
        position: relative;
      }
      @media(max-width: 374px) {
        padding: 15px;
      }
    }

    .bar-title {
      font-size: 1.66667rem;
      line-height: 2rem;
      font-weight: 700;
      margin-bottom: 35px;
      font-family: var(--primary-font);
    }

    .block-information {
      .list {
        display: flex;
        flex-direction: column;
        row-gap: 30px;
      }
    }

    .block-text {
      word-wrap: break-word;
      font-size: 1rem;
      line-height: 1.55556rem;
      font-weight: 500;
    }

    .info-item {
      width: 100%;
      display: flex;

      align-items: center;
      gap: 5px;
    }

    .item__content {
      width: 55%;
      font-weight: 500;
      line-height: 1.55556rem;

      @media screen and (min-width: 728px) {
        width: 30%;
      }
      @media screen and (min-width: 1024px) {
        width: 55%;
      }
    }

    .info-item__language {
      width: 20%;
    }

    .level-text {
      width: 45%;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;

      @media screen and (min-width: 728px) {
        width: auto;
      }
    }

    .skill-level-text {
      color: var(--light-gray);
    }

    .verified {
      min-width: 20px;
      min-height: 20px;
    }

    .interview-btn-wrapper {
      margin: 0 auto;
      padding-bottom: 40px;

      @media screen and (min-width: 728px) {
        padding-top: 80px;
        padding-bottom: 0;
      }
      @media screen and (min-width: 1024px) {
        padding-top: 0;
      }
    }

    .interview-btn {
      min-width: 264px;
      min-height: 45px;

      @media screen and (min-width: 728px) {
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .mobile-hidden {
      height: 50px;
      @media screen and (max-width: 728px) {
        display: none;
      }
    }

    .desktop-hidden {
      @media screen and (min-width: 1024px) {
        display: none;
      }
    }

    .cv-right-bar {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 60px;
      background: var(--white);

      .title {
        max-width: 450px;
        font-size: 1.25rem;
        font-weight: 700;
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          width: 90%;
        }
      }

      @media screen and (min-width: 728px) {
        padding: 50px;
      }
      @media screen and (min-width: 1024px) {
        width: 60%;
        padding: 77px 50px 80px 50px;
        font-weight: 700;
        color: var(--black);
        background-color: var(--white);
      }
    }

    .cv-subtitle {
      font-size: 1.11111rem;
      line-height: normal;
      font-weight: 700;
      color: var(--black);
      padding-bottom: 11px;
      font-family: var(--primary-font);

      display: flex;
      align-items: center;

      .verified {
        margin-left: 108px;
      }
    }

    .programme-name {
      font-size: 1rem;
      line-height: normal;
      font-weight: 700;
      color: var(--black);
      margin-bottom: 5px;
    }

    .description {
      font-size: 1rem;
      line-height: 1.55556rem;
      font-weight: 400;
      color: var(--black);
    }

    .cv-header-edit-btn.mobile {
      position: absolute;
      top: 5%;
      right: 0;

      @media screen and (min-width: 728px) {
        display: none;
      }
    }

    .cv-header-edit-btn.desktop {
      display: none;

      @media screen and (min-width: 728px) {
        display: block;

        position: absolute;
        top: 5%;
        right: 5%;
      }

      @media screen and (min-width: 1024px) {
        top: 10%;
        right: 5%;
      }
    }

    .cv-header-edit-icon {
      width: 32px;
      height: 32px;

      button {
        width: 42px;
        aspect-ratio: 1/1;
        border-radius: 5px;
        border-color: var(--white);
        background: transparent;
        padding: 0 8px;

        span {
          display: flex;
          justify-content: center;
          align-items: center;

          color: var(--base-color);

          &:hover {
            color: var(--accent-color);
          }
        }

        &:hover {
          span {
            color: var(--accent-color);
          }
        }
      }

      svg {
        width: 100%;
        height: 100%;
        object-fit: contain;

        path {
          fill: var(--white);

          transition: fill 0.4s;
        }
      }

      &:hover {
        path {
          fill: var(--accent-color);
        }
      }
    }

    .block-information {
      position: relative;

      .cv-body-edit-btn {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 3px;

        svg {
          width: 100%;
          height: 100%;
          object-fit: contain;

          path {
            fill: var(--base-color);
            transition: fill 0.4s;
          }
        }

        &:hover {
          path {
            fill: var(--accent-color);
          }
        }
      }
    }
  }

  .cv-information-verified {
    margin: 60px auto;
    display: flex;
    align-items: flex-start;
    gap: 10px;

    font-size: 1rem;
    line-height: 1.55556rem;
    font-weight: 500;
    word-wrap: break-word;

    svg {
      width: 24px;
      height: 24px;
      margin-top: 4px;
    }

    h6 {
      width: 280px;
    }

    @media screen and (min-width: 728px) {
      width: 90%;

      h6 {
        width: auto;
      }
    }
    @media screen and (min-width: 1024px) {
      width: 1100px;
      align-items: center;

      h6 {
        width: auto;
      }
    }
  }

  .emptyText {
    font-size: 1rem;
    color: var(--grey, #cdd7e4);
    font-weight: normal;
  }
  .info-item__language {
    color: var(--light-gray);
  }
  .level-text {
    color: var(--light-gray);
  }
  .hobby-text {
    color: var(--light-gray);
  }
  .pdf-btn {
    position: absolute;
    z-index: 99;
    background-color: var(--white);
    box-shadow: 1px 1px 5px 0 var(--shadow-box);
    padding: 8px;
    cursor: pointer;
    border: 1px solid var(--gray);
    width: 70px;
    top: 0;
    right: -70px;

    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1240px) {
      top: -48px;
      right: 0px;
      width: 50px;
    }

    path,
    rect {
      transition: 0.3s;
    }

    svg {
      width: 50px;
      @media screen and (max-width: 1240px) {
        width: 30px;
      }
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
`;
