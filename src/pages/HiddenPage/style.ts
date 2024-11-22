import styled from 'styled-components';

export const StyledHiddenPage = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  svg {
    height: 200px;
    @media screen and (min-width: 768px) {
      height: 300px;
    }
  }
  .title {
    text-align: center;

    font-family: var(--primary-font);
    font-size: 2rem;
    line-height: normal;
    font-weight: 700;
    padding: 30px 0;

    @media screen and (min-width: 1024px) {
      text-align: left;
      font-size: 1.666666rem;
    }
  }
`;
