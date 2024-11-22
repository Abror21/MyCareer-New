import styled from 'styled-components';

export const StyledPersonalDetailsModal = styled.div`
  display: flex;
  justify-content: space-between;
  // gap: 30px;
  z-index: 999;
  position: relative;
  padding: 0px 20px;
  @media screen and (max-width: 1500px) {
    padding: 0px;
  }
  @media screen and (max-width: 1280px) {
    flex-direction: column;
    row-gap: 20px;
    justify-content: center;
  }

  .warning-image {
    /* width: 80%; */
    margin: 10px 0;
    font-size: 0.5556rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 1280px) {
      margin: 10px auto;
    }
    @media screen and (max-width: 500px) {
      font-size: 0.6667rem;
    }
  }

  .image-side {
    width: 40%;
    display: flex;
    flex-direction: column;
    row-gap: 0px;
    margin: 10px auto;

    .avatar {
      display: flex;
      flex-direction: column;
      row-gap: 50px;
      border-radius: 20px;
      background: var(--White, #fff);
      max-width: 325px;
      width: 100%;
      height: 325px;
      padding: 60px;
      box-shadow: 1px 1px 20px 0px var(--shadow-box);
      position: relative;

      @media screen and (max-width: 1280px) {
        margin: 0 auto;
      }
      @media screen and (max-width: 520px) {
        padding: 15px;
      }
      @media screen and (max-width: 450px) {
        height: 225px;
      }
    }

    .selected-image {
      display: none;
      width: 100%;
      height: 330px;

      overflow: hidden;

      &.active {
        display: block;
      }
    }

    .upload-side {
      flex-direction: column;
      align-items: center;
      row-gap: 30px;
      display: none;

      &.active {
        display: flex;
      }

      .boolean-input {
        visibility: none;
        opacity: 0;
        z-index: -1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }

    .remove-image {
      position: absolute;
      top: 30px;
      right: 30px;
      cursor: pointer;

      svg {
        width: 20px;
        fill: var(--base-color);
      }
    }

    @media screen and (max-width: 1280px) {
      width: 100%;
      margin: 0 auto;
    }
  }

  .inputs-side {
    width: 60%;
    @media screen and (max-width: 1480px) {
      width: 55%;
    }
    @media screen and (max-width: 1280px) {
      width: 100%;
    }

    .inputs-box {
      display: flex;
      width: 100%;
      justify-content: space-between;
      gap: 25px;
      @media screen and (max-width: 720px) {
        flex-direction: column;
        row-gap: 10px;
      }

      .input {
        width: 48%;
        @media screen and (max-width: 720px) {
          width: 100%;
        }
      }

      .date-birth-input {
        width: 48%;
        @media screen and (max-width: 500px) {
          width: 100%;
        }
      }

      .addrees-input {
        width: 100%;
      }
    }
  }
`;
