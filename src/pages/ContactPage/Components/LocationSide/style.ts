import styled from 'styled-components';

export const StyledContactLocationSide = styled.div`
  background: var(--silver, #eaf1f6);
  .location-inner {
    display: flex;
    justify-content: space-between;
    max-width: 1250px;
    transition: 0.4s ease;
    gap: 20px;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
      row-gap: 15px;
    }
    @media screen and (min-width: 728px) {
      padding: 83px 60px;
    }

    @media screen and (min-width: 1280px) {
      padding: 130px 50px 130px 50px;
    }
    .card-map {
      padding-right: 10px;
      width: 100%;

      @media screen and (min-width: 1240px) {
        width: 530px;
        padding: 0px;
      }
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
      h4 {
        font-family: var(--primary-font);
        font-size: 1.666666rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin: 20px 0;
      }
      .map {
        box-shadow: 1px 1px 20px 0px var(--shadow-box);
        border-radius: 20px;
        border: 1px solid var(--grey, #cdd7e4);
        width: 100%;
        height: 567px;
        @media screen and (min-width: 1240px) {
          width: 530px;
          height: 567px;
        }

        @media screen and (max-width: 1000px) {
          height: 350px;
          max-width: 100%;
        }
      }
      .map-footer {
        background-color: var(--white);
        border-radius: 10px;
        border: 1px solid var(--grey, #cdd7e4);
        background: #fff;
        box-shadow: 1px 1px 20px 0px var(--shadow-box);
        padding: 25px;
        margin-top: 20px;
        > div {
          display: flex;
          gap: 15px;
          align-items: center;
          justify-content: space-between;
          @media screen and (max-width: 570px) {
            &.address {
              align-items: start;
            }
          }
          h5 {
            font-family: var(--primary-font);
            font-size: 1.11111rem;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }
          h6 {
            font-family: var(--default-font);
            font-size: 0.888888rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            color: var(--grey);
            text-align: right;
          }
        }
      }
    }
  }
`;
