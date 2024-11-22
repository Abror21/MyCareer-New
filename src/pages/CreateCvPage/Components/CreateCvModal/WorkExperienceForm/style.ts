import styled from 'styled-components';

export const StyledWorkExperience = styled.div`
  padding: 0 50px;
  @media screen and (max-width: 1280px) {
    padding: 0;
  }
  .open-modal-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
    margin: 20px 0;
    box-shadow: 1px 1px 5px 0px var(--shadow-box);
    padding: 8px 12px;
    border: 1px solid var(--grey, #cdd7e4);
    border-radius: 8px;

    cursor: pointer;
    span {
      color: var(--base-color);
      font-family: var(--default-font);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 155.556%;
    }
    svg {
      fill: var(--base-color);
      width: 12px;
    }
  }

  /* action modal visible style */
  .action-modal {
    transition: 0.5s ease;
  }
  .action-modal-hidden {
    opacity: 0;
    visibility: hidden;
    position: absolute;
  }
  .action-modal-visible {
    opacity: 1;
    position: initial;
    visibility: visible;
  }

  /* change style when action modal visible */
  .form {
    transition: 0.3s ease;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    &.active {
      position: initial;
      opacity: 1;
      visibility: visible;
    }
  }
`;
