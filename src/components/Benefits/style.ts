import styled from 'styled-components';

export const StyledBenefits = styled.div`
  background: var(--section-bg-color);

  @media screen and (min-width: 1280px) {
    margin-top: -52px;
    margin-bottom: -2px;
  }

  .title {
    width: 100%;
    text-align: center;
    padding-bottom: 32px;

    font-family: var(--primary-font);
    font-size: 1.66667rem;
    line-height: normal;
    font-weight: 700;

    h3 {
      display: inline-block;
      max-width: 623px;
    }

    @media screen and (min-width: 728px) {
      font-size: 2.22223rem;
      line-height: 2.6667rem;
      padding-bottom: 52px;
    }
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    padding-bottom: 57px;
    align-items: stretch;

    @media screen and (min-width: 728px) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
    }
    @media screen and (min-width: 1680px) {
      gap: 48px;
    }
  }

  .card {
    position: relative;
    user-select: none;

    width: 100%;
    aspect-ratio: 1 / 1;
    padding: 42px;
    background: var(--white);

    font-family: var(--primary-font);
    font-size: 1.66667rem;
    line-height: normal;
    font-weight: 600;

    box-shadow: 0 10px 30px 0 rgba(176, 179, 181, 0.2);

    @media screen and (min-width: 728px) {
      font-size: 1.22222rem;
      padding: 42px;
    }

    @media screen and (min-width: 1024px) {
      font-size: 1.11111rem;
      padding: 20px;
    }
    @media screen and (min-width: 1280px) {
      padding: 42px;
    }
    @media screen and (min-width: 1680px) {
      font-size: 1.33333rem;
    }
    @media(max-width: 374px) {
      padding: 24px;
    } 
  }

  .card:before {
    content: '';
    width: 22px;
    height: 22px;
    background: var(--section-bg-color);

    position: absolute;
    bottom: 15px;
    left: 15px;
    z-index: 1000;

    transition: background 0.3s;
  }

  .card:hover:before {
    background: var(--base-color);
  }

  .icon {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;

    svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    @media screen and (min-width: 728px) {
      margin-bottom: 25px;
    }
    @media screen and (min-width: 1024px) {
      width: 40px;
      height: 40px;
      margin-bottom: 15px;
    }
    @media screen and (min-width: 1440px) {
      width: 60px;
      height: 60px;
      margin-bottom: 47px;
    }
  }
`;
