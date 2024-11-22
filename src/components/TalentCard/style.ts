import styled from 'styled-components';

export const StyledTalentCard = styled.div`
  width: 100%;
  min-height: 317px;
  background: var(--white);

  border-radius: 20px;
  padding: 20px;

  @media screen and (min-width: 728px) {
    padding: 31px 57px;
  }

  .talent-card-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;

    margin-bottom: 10px;

    @media screen and (min-width: 1280px) {
      flex-direction: row;
      gap: 30px;
      align-items: flex-start;
    }

    .avatar {
      width: 88px;
      height: 88px;

      span {
        width: 100%;
        height: 100%;

        span {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .personal-details {
    @media screen and (min-width: 1280px) {
      text-align: left;
    }
  }

  .fullname {
    font-family: var(--primary-font);
    font-size: 1.11112rem;
    line-height: 1.27778rem;
    font-weight: 700;

    @media screen and (min-width: 1280px) {
      min-height: 28px;
    }
  }

  .position {
    color: var(--text-color);

    font-family: var(--primary-font);
    font-size: 2.2223rem;
    line-height: normal;
    font-weight: 700;
  }

  .experience {
    @media screen and (min-width: 1280px) {
      text-align: right;
      margin-left: auto;
    }
  }

  .experience-label {
    font-family: var(--primary-font);
    font-size: 1.11112rem;
    line-height: 1.27778rem;
    font-weight: 700;

    @media screen and (min-width: 1280px) {
      margin-bottom: 10px;
    }
  }

  .experience-period {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.55556rem;
  }

  .talent-card-body {
    min-height: 90px;
    padding: 16px 0;

    border-top: 1px solid var(--gray);
    border-bottom: 1px solid var(--gray);

    @media screen and (min-width: 1280px) {
      max-height: 90px;
    }
  }

  .talent-card-footer {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 14px 0;
  }

  .tags-wrapper {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .tag-body {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .talent-card-result {
    font-size: 20px;
    text-align: center;

    h4 {
      margin: 20px 0;
      font-weight: 700;
    }

    .btn {
      width: 50px;
      border-radius: 5px;
      padding: 0px;
      margin: 20px 0;
      color: var(--base-color);
      border: 1px solid var(--base-color);
    }
  }

  .verified {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .not-skills {
    display: none;
  }

  .avatar-cv-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--gray);
    background: var(--white);
    box-shadow: 1px 1px 20px 0 rgba(205, 215, 228, 0.5);

    svg {
      width: 41px;
      height: 44px;
    }

    path {
      fill: var(--base-color);
    }
  }
`;
