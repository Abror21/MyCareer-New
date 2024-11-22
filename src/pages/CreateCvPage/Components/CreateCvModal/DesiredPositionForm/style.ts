import styled from 'styled-components';

export const StyledDesiredPosition = styled.div`
  padding: 0 60px;
  @media screen and (max-width: 1280px) {
    padding: 0;
  }
  @media screen and (max-width: 1280px) {
    width: 100%;
  }
  .textarea-label {
    display: flex;
    align-items: center;
    @media screen and (max-width: 520px) {
      margin-top: 10px;
    }
    @media screen and (max-width: 480px) {
      flex-direction: column;
      align-items: start;
    }
  }
  .label-span {
    font-size: 0.7778rem;
    color: var(--grey);
    margin-left: 3px;
    margin-top: 2px;
  }
  textarea {
    height: 95px;
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
    .textarea {
      width: 100%;
      display: block;
    }
  }
`;
