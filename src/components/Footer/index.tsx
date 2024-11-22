import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useIntl } from 'react-intl';

import { StyledFooter } from './style';
import { navigation } from 'utils/consts';
import { Button, FixedScrollUpButton } from 'ui';
import useJwt from 'utils/useJwt';

import { useUserDispatch } from 'contexts/UserContext';

export const Footer = () => {
  const intl = useIntl();
  const { remove } = useJwt();
  const hasJwt = !!Cookies.get('jwt');
  const { dispatch: userDispatch } = useUserDispatch();

  const logoutHandler = () => {
    remove();
    userDispatch({
      type: 'SET_USER_DATA',
      payload: {
        email: '',
        id: 0,
      },
    });
  };

  return (
    <>
      <StyledFooter>
        <div className="container">
          <div className="inner">
            <div className="logo-wrapper">
              <Link to={'/'} className="footer-logo">
                MyCareer
              </Link>
            </div>

            <div className="info">
              <div className="contacts">
                <div className="contacts__title">{intl.messages.address && intl.formatMessage({ id: 'address' })}</div>
                <div className="contacts__list">
                  <div>{intl.messages.companyName && intl.formatMessage({ id: 'companyName' })}</div>
                  <div>{intl.messages.addressLine1 && intl.formatMessage({ id: 'addressLine1' })}</div>
                  <div>{intl.messages.addressLine2 && intl.formatMessage({ id: 'addressLine2' })}</div>
                  <div>
                    {intl.messages.phoneNumber && intl.formatMessage({ id: 'phoneNumber' })}:&nbsp;<a href="tel:+998977500004">+998977500004</a>
                  </div>
                </div>
              </div>

              <div className="quick-links">
                <h4 className="quick-links__title">{intl.messages.quickLinks && intl.formatMessage({ id: 'quickLinks' })}</h4>
                <div className="quick-links__nav">
                  {navigation.map((item) => (
                    <NavLink
                      to={item.to}
                      key={item.key}
                      className={({ isActive }) => `${isActive ? 'quick-links__item active' : 'quick-links__item'}`}
                    >
                      {intl.messages[item.key] && intl.formatMessage({ id: item.key })}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div>
                <div className="login-block">
                  {hasJwt ? (
                    <Button
                      label={intl.messages.logout && intl.formatMessage({ id: 'logout' })}
                      type="primary"
                      className="btn logout-btn primary-btn"
                      onClick={logoutHandler}
                    />
                  ) : (
                    <Button
                      label={intl.messages.footerLoginBtn && intl.formatMessage({ id: 'footerLoginBtn' })}
                      type="primary"
                      className="btn primary-btn"
                      href="/login"
                    />
                  )}

                  {!hasJwt && (
                    <div className="create-account">
                      {intl.messages.createAccount && intl.formatMessage({ id: 'createAccount' })}&nbsp;
                      <Link className="create-account-link" to={'/login'}>
                        {intl.messages.here && intl.formatMessage({ id: 'here' })}
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="copyright">©&nbsp;MyCareer&nbsp;|&nbsp;{intl.messages.copyright && intl.formatMessage({ id: 'copyright' })}</div>
      </StyledFooter>
      <FixedScrollUpButton />
    </>
  );
};
