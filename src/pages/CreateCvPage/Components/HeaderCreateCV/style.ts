import styled from 'styled-components';

export const StyledHeaderCreateCv = styled.div`
  color: var(--white);
  font-size: 18px;
  @media screen and (max-width: 1280px) {
    font-size: 16px;
  }
  @media screen and (max-width: 1080px) {
    font-size: 14px;
  }
  @media screen and (max-width: 720px) {
    font-size: 12px;
  }
  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
  a {
    font-size: 1.25em;
    font-family: var(--default-font);
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    opacity: 0;
    visibility: hidden;
    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
  h1 {
    font-size: 4.5em;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 20px;
    font-family: var(--primary-font);
    > span {
      color: var(--Green, var(--White, #55ca85));
    }
  }
`;
