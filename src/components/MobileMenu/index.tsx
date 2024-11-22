import React from 'react';
import { NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Cookies from 'js-cookie';
import { Divider } from 'antd';

import { StyledMobileMenu } from './style';
import { navigation } from 'utils/consts';
import { Button } from 'ui';
import { UserProfileBadge } from 'components';

type MobileMenuProps = {
  setMenuOpen: (value: boolean) => void;
};

export const MobileMenu = ({ setMenuOpen }: MobileMenuProps) => {
  const intl = useIntl();
  const hasJwt = !!Cookies.get('jwt');

  return (
    <StyledMobileMenu>
      <div className="container">
        <div className="navbar">
          {navigation.map((item, index) => (
            <React.Fragment key={index}>
              {intl.messages[item.key] && (
                <NavLink
                  onClick={() => setMenuOpen(false)}
                  to={item.to}
                  key={item.key}
                  className={({ isActive }) => `${isActive ? 'item active' : 'item'}`}
                >
                  {intl.formatMessage({ id: item.key })}
                </NavLink>
              )}
            </React.Fragment>
          ))}

          <Divider />

          {hasJwt ? (
            <UserProfileBadge onClick={() => setMenuOpen(false)} />
          ) : (
            <Button
              label={intl.messages.login && intl.formatMessage({ id: 'login' })}
              type="primary"
              className="btn login-btn primary-btn"
              href="/login"
            />
          )}
        </div>
      </div>
    </StyledMobileMenu>
  );
};
