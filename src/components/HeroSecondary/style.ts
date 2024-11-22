import styled from 'styled-components';
import CvBg from 'assets/images/cv-background.jpg';

export const StyledTitleSection = styled.div`
  position: relative;
  overflow: hidden;
  padding: var(--main-top);
  margin-top: var(--header-height);
  padding-bottom: 96px;
  width: 100%;

  @media screen and (min-width: 728px) {
    height: auto;
  }

  background: url(${CvBg}) no-repeat center center;
  background-size: cover;
  .overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    background: linear-gradient(180deg, rgba(7, 7, 7, 0.6) 45.83%, rgba(58, 112, 179, 0.6) 100%);
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

  .hero-flex-card {
    position: relative;
    flex-direction: column;
    background: var(--white);
    width: 100%;
    padding: 45px 40px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .image {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .description {
    width: 100%;
    text-align: center;
    line-height: normal;
    font-style: normal;
    .min-title {
      color: var(--black);
      font-family: var(--primary-font);
      font-size: 30px;
      font-weight: 700;

      margin: 12px 0;
    }

    .title-placeholder {
      color: var(--base-color);
      font-family: var(--primary-font);
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-top: 30px;
    }

    .text {
      font-family: var(--default-font);
      font-size: 18px;

      font-weight: 400;
      line-height: 1.5556rem;
    }
  }
  @media screen and (min-width: 1280px) {
    .hero-flex-card{
      padding: 95px 142px;
    }
  }
  @media screen and (min-width: 1024px) {
    .hero-flex-card {
      flex-direction: row;
      gap: 40px;
      align-items: start !important;
    }
    .reverse {
      flex-direction: row-reverse;
    }
    .image {
      img {
        width: 528px;
        height: 353px;
      }
    }
    .description {
      text-align: start;
      width: 50%;
      .title-placeholder {
        margin-top: 0px;
        letter-spacing: 4.5px;
        font-size: 18px;
      }
      .min-title {
        font-size: 40px;
        margin: 14px 0;
      }
      .text {
        font-size: 1rem;
      }
    }
  }
`;
