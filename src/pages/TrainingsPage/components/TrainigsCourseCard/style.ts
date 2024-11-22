import styled from 'styled-components';

export const StyledTrainigsCourseCard = styled.div`
  background-color: var(--section-bg-color);

  .course-card {
    max-width: 100%;
    padding: 0 25px;
    @media screen and (min-width: 1024px) {
      max-width: 1550px;
    }
  }
  .section-margins {
    margin: 90px auto;
    @media screen and (min-width: 768px) {
      margin: 80px auto;
    }
  }

  .card-header{
    margin-bottom: 64px;
  }

  .pre-title {
    font-size: 1.666666rem;
    font-weight: 700;
    line-height: 2.555555rem;
    font-family: var(--primary-font);
    text-align: center;
    @media screen and (min-width: 1024px) {
      font-size: 2.22222rem;
      text-align: left;
    }
  }

  .description {
    margin: 14px 0;
    font-weight: 1.555555rem;
    text-align: center;
    @media screen and (min-width: 1024px) {
      text-align: left;
    }
  }
  .level {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
    @media screen and (min-width: 768px) {
      justify-content: start;
    }
    
  }
  .card-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    color: var(--white);

    text-align: center;
    @media screen and (min-width: 1024px) {
      flex-direction: row;
      align-items: start;
      text-align: left;
    }
  }

  .context {
    background: var(--base-color);
    border-radius: 20px;
    width: 100%;
    padding: 25px;
    @media screen and (min-width: 1024px) {
      max-width: 456px;
    }

    .description-block {
      .title {
        font-size: 1.666666rem;
        color: var(--white);
        font-weight: 700;
        font-family: var(--primary-font);
        line-height: 1.944444rem;
      }
      p {
        margin-top: 40px;
        line-height: 1.555555rem;
      }
    }

    .enrolle-block {
      margin: 50px 0;
      .enroll {
        font-size: 1.11111rem;
        color: var(--white);
        font-weight: 700;
        font-family: var(--primary-font);
        line-height: 1.277777rem;
      }

      ul {
        margin-top: 20px;
        padding: 0px 25px;
        list-style: disc;
      }
    }

    .action-block {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 32px;
      margin: 20px 0 30px 0;
      h5 {
        font-size: 1.666666rem;
        color: var(--white);
        font-weight: 700;
        font-family: var(--primary-font);
        line-height: 1.944444rem;
      }
      @media screen and (min-width: 1024px) {
        justify-content: start;
      }
    }
  }

  .lesson-topics {
    background: yellow;
    width: 100%;
    padding: 25px;
    border-radius: 20px;
    color: var(--black);
    background: var(--white);
    height: max-content;
    @media screen and (min-width: 1024px) {
      max-width: 921px;
    }
    .keyLearning-title {
      font-size: 1.666666rem;
      font-weight: 700;
      font-family: var(--primary-font);
      line-height: 1.944444rem;
    }
    .learning-objectives-inner {
      display: flex;
      justify-content: stretch;
    }
    .learning-objectives-list {
      margin-top: 32px;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 32px;

      @media screen and (min-width: 1024px) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
  .learning-objectives-card {
    max-width: 100%;
    @media screen and (min-width: 1024px) {
      max-width: 338px;
    }

    .learning-objectives-title {
      font-size: 1.11111rem;
      font-weight: 700;
      font-family: var(--primary-font);
      line-height: 1.277777rem;
      text-align: left;
    }
    ul {
      padding: 8px 20px 0px 20px;
      list-style: disc;
      li {
        line-height: 1.5556rem;
      }
    }
  }
  @media screen and (min-width: 1024px) {
    .learning-objectives-card:nth-child(1) {
      grid-column: 1;
      grid-row: 1;
    }
    .learning-objectives-card:nth-child(2) {
      grid-column: 1;
      grid-row: 2;
    }
    .learning-objectives-card:nth-child(3) {
      grid-column: 1;
      grid-row: 3;
    }
    .learning-objectives-card:nth-child(4) {
      grid-column: 1;
      grid-row: 4;
    }

    .learning-objectives-card:nth-child(5) {
      grid-column: 2;
      grid-row: 1;
    }
    .learning-objectives-card:nth-child(6) {
      grid-column: 2;
      grid-row: 2;
    }
    .learning-objectives-card:nth-child(7) {
      grid-column: 2;
      grid-row: 3;
    }
    .learning-objectives-card:nth-child(8) {
      grid-column: 2;
      grid-row: 4;
    }
  }

  .btn {
    min-width: 200px;
  }

  .active {
    background: var(--base-color);
    &:hover {
      background: var(--base-color) !important;
    }
  }
  .text-left {
    text-align: left;
  }
`;
