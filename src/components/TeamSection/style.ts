import styled from 'styled-components';

export const StyledTeamSection = styled.div`
  background: var(--section-bg-color);

  padding-top: 30px;
  padding-bottom: 30px;

  @media screen and (min-width: 768px) {
    padding-top: 83px;
    padding-bottom: 83px;
  }

  @media screen and (min-width: 1280px) {
    padding-top: 60px;
    padding-bottom: 97px;
  }

  .title {
    width: 100%;
    text-align: center;

    font-family: var(--primary-font);
    font-size: 1.66667rem;
    line-height: normal;
    font-weight: 700;

    h2 {
      display: inline-block;
      max-width: 623px;
    }

    @media screen and (min-width: 728px) {
      font-size: 2.22223rem;
    }
    @media screen and (min-width: 1280px) {
      font-size: 3.33334rem;
      padding-bottom: 20px;
    }
  }

  .wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .cards {
    max-width: 1290px;
    padding: 36px 0;
    display: flex;
    flex-direction: column;
    gap: 36px;

    @media screen and (min-width: 728px) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: stretch;
    }
    @media screen and (min-width: 1280px) {
      gap: 48px;
    }
  }

  .card {
    max-width: 333px;
    min-height: 498px;
    position: relative;
    height: 100%;
    background: white;
    padding-bottom: 10px;



    @media screen and (min-width: 1441px) {
      min-width: 382px;
      max-width: 382px;
    }
  }

  .image {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    padding: 25px;
    background: var(--white);

    position: relative;

    @media screen and (min-width: 728px) {
      padding: 15px;
    }
    @media screen and (min-width: 1280px) {
      padding: 30px;
      min-height: 128px;
    }
  }

  .name {
    font-family: var(--primary-font);
    font-size: 1.66667rem;
    line-height: normal;
    font-weight: 700;
    padding-bottom: 10px;

    @media screen and (min-width: 728px) {
      font-size: 1rem;
    }

    @media screen and (min-width: 1280px) {
      font-size: 1.66667rem;
    }
  }

  .position {
    font-size: 1rem;
    line-height: 1.55556rem;
    font-weight: 400;

    @media screen and (min-width: 728px) {
      font-size: 1rem;
      line-height: 1.2;
    }
  }

  .flag {
    width: 24px;
    position: absolute;

    bottom: 9px;
    right: 14px;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
