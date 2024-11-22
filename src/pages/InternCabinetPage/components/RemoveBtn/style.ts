import styled from 'styled-components';

export const StyledRemoveBtn = styled.div`
  .remove-btn {
    box-shadow: 1px 1px 5px 0px var(--shadow-box);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    height: 24px;
    width: 24px;
    svg {
      fill: #dc4446;
      width: 10px;
    }
    @media screen and (min-width: 768px) {
      height: 42px;
      min-width: 42px;
      svg {
        width: 20px;
      }
    }
    &.mobile {
      display: none;
    }
    @media screen and (max-width: 620px) {
      &.mobile {
        display: block;
      }
      &.desktop {
        display: none;
      }
    }
  }
`;
