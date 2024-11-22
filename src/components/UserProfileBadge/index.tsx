import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Avatar } from 'antd';
import { useIntl } from 'react-intl';

import { StyledUserProfileBadge } from './style';
import useJwt from 'utils/useJwt';
import { useUserDispatch, useUserState } from 'contexts/UserContext';
import { routes } from 'config/config';
import SvgSelector from '../../assets/icons/SvgSelector';

type UserProfileBadgeProps = {
  onClick?: () => void;
};

export const UserProfileBadge = ({ onClick }: UserProfileBadgeProps) => {
  const intl = useIntl();
  const { remove } = useJwt();
  const { dispatch: userDispatch } = useUserDispatch();
  const { image } = useUserState();
  const location = useLocation();
  const params = useParams()

  const logoutHandler = () => {
    remove();
    userDispatch({
      type: 'SET_USER_DATA',
      payload: {
        email: '',
        id: 0,
        image: '',
      },
    });
    localStorage.clear();
  };

  return (
    <StyledUserProfileBadge>
      <div className="user-badge-inner">
        {location.pathname !== '/admin' && location.pathname !== `/admin/cv/${params?.id}`  && (
          <Link to={'/profile'} onClick={onClick}>
            {image ? (
              <Avatar size={70} src={`${routes.api.baseUrl}/${image}`} />
            ) : (
              <div className="user-badge-avatar">
                <Avatar icon={<SvgSelector className="avatar-icon" id="avatar-icon" />} />
              </div>
            )}
          </Link>
        )}
        <button className="logout-btn" onClick={logoutHandler}>
          {intl.messages.logout && intl.formatMessage({ id: 'logout' })}
        </button>
      </div>
    </StyledUserProfileBadge>
  );
};
