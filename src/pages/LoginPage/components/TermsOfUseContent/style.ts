import styled from 'styled-components';

export const StyledTermsOfUseContent = styled.div`
  .content-box {
    overflow: auto;
    height: 650px;
    padding-right: 5px;
  }
  .inner {
    margin: 40px 0;
  }

  .bold,
  .title {
    font-family: var(--primary-font);
    font-weight: 700;
  }

  .content,
  .bold {
    margin: 10px 0;
  }
  .content {
    a {
      color: var(--base-color);
      &:hover {
        color: var(--base-color);
      }
    }
  }

  .list {
    margin: 10px 0;
    .title {
      margin-right: 4px;
    }
  }

  .list-style {
    list-style: circle !important;
    padding: 20px 60px !important;
    li {
      list-style: disc !important;
    }
  }
`;
