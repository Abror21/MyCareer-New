import styled from 'styled-components';

export const StyledCertificateAdd = styled.div`
  margin-top: 30px;

  .title {
    font-family: var(--primary-font);
    font-size: 1.1111rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 20px 0;
  }
  svg {
    width: 50px;
    fill: var(--base-color);
  }
  .certificate-list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    overflow: hidden;
    min-height: 80px;
    @media screen and (max-width: 420px) {
      font-size: 16px;
    }
  }
`;
