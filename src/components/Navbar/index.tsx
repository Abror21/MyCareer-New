import { NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Cookies from 'js-cookie';

import { StyledNavbar } from './style';
import { navigation } from 'utils/consts';
import { Button } from 'ui';
import { LanguageSwitcher, UserProfileBadge } from 'components';
import React from 'react';

export const Navbar = () => {
  const intl = useIntl();
  const hasJwt = !!Cookies.get('jwt');

  return (
    <StyledNavbar>
      <div className="navbar-inner">
        {navigation.map((item) => (
          <React.Fragment key={item.key}>
            {intl.messages[item.key] && (
              <NavLink to={item.to} key={item.key} className={({ isActive }) => `${isActive ? 'item active' : 'item'}`}>
                {intl.messages[item.key] && intl.formatMessage({ id: item.key })}
              </NavLink>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="language-switcher-wrapper">
        <LanguageSwitcher />
      </div>

      {hasJwt ? (
        <UserProfileBadge />
      ) : (
        <Button
          label={intl.messages.login && intl.formatMessage({ id: 'login' })}
          type="primary"
          className="btn login-btn primary-btn"
          href="/login"
        />
      )}
    </StyledNavbar>
  );
};
