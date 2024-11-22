import styled from 'styled-components';
import authBg from 'assets/images/auth-bg.jpg';

export const StyledLoginPage = styled.section`
  background: url(${authBg}) no-repeat center center;
  background-size: cover;

  height: 100vh;
  padding: 0 15px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .form-wrapper {
    position: relative;

    width: 100%;
    max-width: 499px;
    min-height: 547px;
    box-sizing: border-box !important;
    padding: 30px 15px;

    border-radius: 30px;
    border: 0.5px solid var(--section-bg-color);
    background: var(--white);
    box-shadow: 0 5px 40px 0 rgba(34, 34, 34, 0.1);

    @media screen and (min-width: 728px) {
      width: 499px;

      padding: 60px 35px;
    }
  }

  .home-link {
    position: absolute;
    top: -8%;
    left: 0;
  }

  .form {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    .ant-form-item-required {
      font-size: 1.11112rem !important;
      line-height: 1.55556rem !important;
      font-weight: 700 !important;
    }
  }

  .flex {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    align-items: center;

    @media screen and (min-width: 728px) {
      gap: 10px;
    }
  }

  .title {
    font-family: var(--primary-font);
    font-size: 2.22222rem;
    font-weight: 700;
    line-height: normal;
    text-align: center;

    @media screen and (min-width: 1280px) {
      font-size: 3.33334rem;
    }
  }
  .title-practice {
    font-family: var(--primary-font);
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    line-height: 145%;
  }
  .title-small {
    font-family: var(--primary-font);
    font-size: 2.22222rem;
    font-weight: 700;
    line-height: normal;
    text-align: center;
  }

  .subtitle {
    font-family: var(--primary-font);
    font-weight: 700;
    line-height: normal;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media screen and (min-width: 728px) {
      flex-direction: row;
      font-size: 1.11112rem;
      line-height: 1.27778rem;
    }

    p {
      display: inline-block;
    }
  }

  .link {
    display: inline-block;
    color: var(--accent-color);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: var(--base-color) !important;
    }
  }

  .input {
    position: relative;
    min-width: 300px;
    width: 100%;
    min-height: 53px;
    border-radius: 5px !important;

    @media screen and (min-width: 728px) {
      min-width: 380px;
    }
  }

  label {
    font-size: 0.88888rem !important;
    font-weight: 700 !important;
  }

  .additionalInfo {
    max-width: 300px;
    font-size: 1rem;
    line-height: 1.55556rem;
    font-weight: 500;

    text-align: center;

    @media screen and (min-width: 728px) {
      max-width: 326px;
    }
  }

  .verify-email-msg {
    height: 100%;
    max-width: 300px;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;

    p {
      display: inline-block;
      margin: auto 0;
    }
  }

  .user-email {
    color: var(--accent-color);
  }

  .submit-btn {
    width: 100%;

    @media screen and (min-width: 728px) {
      width: 200px;
      height: 45px;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .back-btn {
    min-width: 120px;
    height: 45px;
  }

  .form-footer {
    width: 100%;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .ant-form {
    height: 100% !important;
  }

  .ant-form-item-feedback-icon-error {
    display: none !important;
  }

  .spinner {
    width: 500px;
  }

  .recover-message {
    margin-top: -40%;
    display: flex;
    flex-direction: column;
    gap: 53px;
  }
  .submit-btn {
    &.disabled {
      background-color: var(--section-bg-color);
    }
  }
  .terms-of-use {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    .ant-form-item {
      margin-bottom: 0;
    }
    p {
      display: flex;
      gap: 3px;
      span {
        color: var(--accent-color);
        cursor: pointer;
      }
    }

    @media screen and (max-width: 1100px) {
      bottom: 0;
      left: 0;
    }
    @media screen and (max-width: 580px) {
      flex-direction: column;
      bottom: -15px;
      text-align: start;
    }
  }
`;
