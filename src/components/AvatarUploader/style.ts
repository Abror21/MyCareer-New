import styled from 'styled-components';

export const StyledAvatarUploader = styled.div`
  width: 100%;

  .avatar-upload-wrapper {
    position: relative;
    margin: 0 auto;

    width: 100%;
    aspect-ratio: 1/1;

    max-width: 325px;
    max-height: 325px;

    display: flex;
    flex-direction: column;
    gap: 50px;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    background: var(--white);
    box-shadow: var(--box-shadow);

    @media screen and (min-width: 728px) {
      width: 325px;
      height: 325px;
    }

    .existing-image {
      width: 205px;
      height: 205px;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .remove-image {
      position: absolute;
      top: 30px;
      right: 30px;
      cursor: pointer;

      svg {
        width: 20px;

        path {
          fill: var(--base-color);

          transition: fill 0.3s;
        }
      }

      &:hover {
        path {
          fill: var(--accent-color);
        }
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
  }

  .warning-image {
    width: 100%;
    max-width: 325px;
    max-height: 325px;

    margin: 10px auto;
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
`;
