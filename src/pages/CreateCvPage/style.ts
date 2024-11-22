import styled from 'styled-components';
import CreateCvBg from 'assets/images/cv-background.jpg';

export const StyledCreateCV = styled.div`
  background-image: url(${CreateCvBg});
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  margin-top: var(--header-height);
  padding: var(--main-top);
  .ant-btn-primary {
    background-color: var(--accent-color);
  }
  .craete_sv_inner {
    position: relative;
    width: 90%;
    max-width: 1350px;
    margin: auto;
    padding-bottom: 120px;
    @media screen and (max-width: 1556px) {
      padding-top: 0px;
    }
    @media screen and (max-width: 420px) {
      width: 100%;
    }
  }
  .create_cv_icon {
    position: absolute;
    left: -50px;
    width: 50px;
    top: 70px;
  }

  /* Style for show action modal */
  &:has(.action-modal-visible) {
    .progres-bar {
      visibility: none;
      opacity: 0;
    }
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--accent-color);
    border-color: var(--accent-color);
  }
`;
