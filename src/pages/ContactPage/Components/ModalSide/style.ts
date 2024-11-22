import styled from 'styled-components';
import CvBg from 'assets/images/cv-background.png';

export const StyledContactModalSide = styled.div`
  .contactus__form-loader{
    .ant-spin{
      max-height: unset !important;
      &::before{
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: white;
      z-index: 1;
      opacity: 0.6;
      }
    }
    .ant-spin-dot{
      .ant-spin-dot-item{
        background-color: #4baf74;
        opacity: 1;
      }
    }
  }

  background-image: url(${CvBg});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  margin-top: var(--header-height);
  padding: var(--main-top);

  padding-bottom: 96px;

  .modal {
    max-width: 1340px;
  }

  .overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    background: linear-gradient(180deg, rgba(7, 7, 7, 0.6) 45.83%, rgba(58, 112, 179, 0.6) 100%);
  }

  .modal-inner {
    position: relative;
    padding: 68px 140px;
    overflow: hidden;
    border-radius: 20px;
    border: 1px solid var(--Grey, #cdd7e4);
    transition: 0.5s ease;
    background: var(--white);
    @media screen and (max-width: 1280px) {
      padding: 70px;
    }
    @media screen and (max-width: 720px) {
      font-size: 0.8rem;
    }
    @media screen and (max-width: 520px) {
      padding: 40px;
    }
    @media screen and (min-width: 1440px) {
      min-height: 550px;
    }
  }

  .modal-title {
    h4 {
      font-family: var(--primary-font);
      font-size: 1.666666rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .type-change {
      margin: 18px 0 41px 0;
      display: flex;
      gap: 5px;
      font-family: var(--primary-font);
      font-size: 1.11111rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      align-items: center;

      span {
        color: var(--black);
      }

      h2 {
        margin: 12px 0;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.4);

        &.active {
          color: var(--black);
        }
      }
    }
  }

  .contact-submit {
    border-radius: 28px;
    padding: 0 30px;
    margin: 15px 0;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: var(--accent-color);
  }

  .ant-spin-nested-loading {
    margin-top: 30px;
  }

  .ant-form-item-label {
    label {
      font-family: var(--default-font);
      font-size: 1.11111rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }

  .ant-form-item {
    .ant-col {
      width: auto;

      .ant-input {
        width: auto;
        @media screen and (min-width: 768px) {
          width: 261px;
        }
      }
    }

    input {
      height: 41px;
      box-shadow: 1px 1px 20px 0px var(--shadow-box);

      &::placeholder {
        color: var(--black, #070707);
        font-family: var(--default-font);
        font-size: 0.888888rem;
        font-style: normal;
        font-weight: 500;
        line-height: 28px;
      }
    }

    textarea {
      width: 100% !important;
      height: 113px;
      resize: none;
      box-shadow: 1px 1px 20px 0px var(--shadow-box);

      &::placeholder {
        color: var(--black, #070707);
        font-family: var(--default-font);
        font-size: 0.888888rem;
        font-style: normal;
        font-weight: 500;
        line-height: 28px;
      }
    }

    .ant-form-item-control {
      max-width: 100%;
    }

    .ant-form-item-label {
      text-align: start;
      max-width: 100%;
      margin-bottom: 5px;
      font-family: var(--default-font);
      font-size: 1.11111rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .ant-row {
      display: block;
      row-gap: 20px;
    }
  }

  .navigate {
    position: relative;

    display: flex;
    align-items: center;
    gap: 10px;

    li {
      font-family: var(--primary-font);
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 3px;
      text-transform: uppercase;

      color: var(--white);
    }

    li:nth-child(2) {
      color: var(--base-color);
    }

    a {
      color: var(--base-color);
    }
    a:hover {
      color: var(--accent-color);
    }
  }
`;
