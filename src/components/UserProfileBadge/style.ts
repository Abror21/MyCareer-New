import styled from 'styled-components';

export const StyledUserProfileBadge = styled.div`
  text-align: right;
  @media screen and (min-width: 1280px) {
    min-width: 177px;
    width: 177px;
  }

  .user-badge-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-badge-avatar {
    width: 56px;
    height: 56px;
    border-radius: 100%;

    background: var(--white);

    @media screen and (min-width: 1280px) {
      width: 70px;
      height: 70px;
    }

    .avatar-icon {
      width: 55%;
      height: 55%;
    }

    .ant-avatar {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      background: var(--white);
    }
  }
`;
