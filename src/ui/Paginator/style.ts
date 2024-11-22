import styled from 'styled-components';
export const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  .common-class {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-radius: 100%;
    border: 1px solid var(--white);
    color: white;
  }
  .ant-pagination-item {
    background: none;
    border: none;
    margin: 0;
  }
  .active-class {
    width: 20px !important;
    height: 20px !important;
    color: var(--base-color);
    background: var(--white);
  }
  .prev-next-class {
    color: var(--white);
    background: none;
    border: 1px solid var(--white);
  }
  .paginator-class {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
  @media screen and (min-width: 425px) {
    justify-content: end;
    width: 400px;
  }
  @media screen and (min-width: 767px) {
    width: 700px;
    justify-content: end;
    .common-class {
      width: 30px;
      height: 30px;
      font-size: 18px;
    }
    .active-class {
      width: 30px !important;
      height: 30px !important;
    }
    .prev-next-class {
      margin: 0 10px;
    }
  }
  @media screen and (min-width: 1024px) {
    width: 900px;
    .prev-next-class {
      margin: 0 10px;
    }
  }
`;
