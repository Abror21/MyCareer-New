import styled from 'styled-components';
import cvBg from 'assets/images/cv-background.jpg';

export const StyledTalentViewPage = styled.div`
  margin-top: 10px;
  padding: var(--main-top);
  
  min-height: calc(100vh - var(--header-height));
  background:
    linear-gradient(to bottom, transparent 45%, var(--section-bg-color) 20%),
    url(${cvBg}) no-repeat;

  @media screen and (min-width: 728px) {
    /* min-height: calc(100vh - var(--header-height)); */
    background: linear-gradient(to bottom, transparent 40%, var(--section-bg-color) 30%), url(${cvBg});
  }

  @media screen and (min-width: 1024px) {
    /* min-height: calc(100vh - var(--header-height)); */
    background: linear-gradient(to bottom, transparent 50%, var(--section-bg-color) 50%), url(${cvBg});
  }

  .talent-view-inner {
    margin: 0 auto;
    max-width: 1104px;
    padding-top: 40px;
    padding-bottom: 97px;
  }
  .navigate-back {
    max-width: 1104px;
    margin: 0 auto;
    color: white;
    position: relative;
    z-index: 1;
    font-size: 1.2222rem;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    padding: 100px 0 0 0;
  }
`;
