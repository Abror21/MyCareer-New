import styled from 'styled-components';
import bgImage from 'assets/images/talents-bg.jpg';

export const StyledTalentsPage = styled.div`
  width: 100%;
  margin-top: var(--header-height);
  padding: 30px 0;

  background: var(--blue-preload-bg-color) url(${bgImage}) no-repeat center center fixed;
  background-size: cover;

  .talents-inner {
    max-width: 912px;
    margin: 0 auto;
    padding-top: 20px;
  }

  .title {
    padding-top: 20px;

    h1 {
      color: var(--white);
      font-family: var(--primary-font);
      font-size: 3.33334rem;
      font-weight: 700;
      line-height: normal;

      @media screen and (min-width: 728px) {
        font-size: 4.44445rem;
      }
    }
  }
  .ant-breadcrumb {
    font-family: var(--primary-font);
  }

  a:hover {
    color: unset;
  }
`;
