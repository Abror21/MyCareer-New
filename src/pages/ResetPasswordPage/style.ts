import styled from 'styled-components';
import authBg from 'assets/images/auth-bg.jpg';

export const StyledResetPasswordPage = styled.section`
  background: url(${authBg}) no-repeat center center;
  background-size: cover;

  height: 100vh;

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
  }

  .subtitle {
    display: flex;
    align-items: center;
    text-align: center;

    @media screen and (min-width: 728px) {
      display: flex;
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
    min-width: 305px;
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
    font-size: 0.88888rem;
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
    width: 120px;
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
`;
