import styled from 'styled-components';

export const StyledAdminFooter = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--blue-700);
  padding: 25px 45px;
  border-top: 1px solid var(--gray-tritar);
  max-height: 80px;
  background: #fff;
  > div {
    display: flex;
    align-items: center;
  }
  .links {
    gap: 50px;
    h3 {
      color: var(--gray-600);
      font-family: var(--default-font);
      font-size: 0.777777rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.1111rem;
    }
    span {
      height: 60%;
      max-height: 18px;
      width: 1px;
      background-color: (--gray-tritar);
    }
    ul {
      display: flex;
      gap: 20px;
      li {
        font-family: var(--default-font);
        font-size: 0.777777rem;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
    }
  }
  .social-media {
    display: flex;
    gap: 25px;
    .item {
      display: flex;
      gap: 10px;
      align-items: center;
      .icon {
        display: flex;
        width: 36px;
        height: 36px;
        flex-direction: column;
        justify-content: center;
        background-color: #3a70b30f;
        border-radius: 100px;
        align-items: center;
        .svg {
          width: 25px;
          height: 25px;
        }
      }
      span {
        font-family: var(--default-font);
        font-size: 0.777777rem;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
    }
  }
`;
