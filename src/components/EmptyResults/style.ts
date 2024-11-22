import styled from 'styled-components';

export const StyledEmptyResults = styled.div`
  width: 100%;
  min-height: 317px;
  background: var(--white);

  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 728px) {
    padding: 31px 57px;
  }

  .results {
    text-align: center;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .results-title {
    font-size: 2.22223rem;
    line-height: normal;
  }

  .results-text {
    font-weight: 500;
  }

  .results-btn {
    button {
      width: max-content;
      height: 30px;
      border-radius: 5px;
      border-color: var(--base-color);
      padding: 0 8px;

      span {
        display: flex;
        justify-content: center;
        align-items: center;

        color: var(--base-color);

        &:hover {
          color: var(--accent-color);
        }
      }

      &:hover {
        span {
          color: var(--accent-color);
        }
      }
    }
  }
`;
