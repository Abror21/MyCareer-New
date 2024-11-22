import { Link, NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { StyledAdminNav } from './style';
import { adminNavigation, NavigationItem } from 'utils/consts';
import useJwt from 'utils/useJwt';
import { useUserState } from 'contexts/UserContext';
import { useEffect, useState } from 'react';

export const AdminNavbar = () => {
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const [allowedItems, setAllowedItems] = useState<NavigationItem[] | []>([]);
  const { remove } = useJwt();
  const logoutHandler = () => {
    remove();
    localStorage.clear();
  };

  useEffect(() => {
    const userPermissions = allowedPages ? allowedPages : [];

    const filteredItems = adminNavigation.filter((item) => {
      return !item.permission || userPermissions.includes(item.permission);
    });

    setAllowedItems(filteredItems);
  }, [allowedPages]);  

  return (
    <StyledAdminNav>
      <div className="navbar-inner">
        <Link to="/" className="logo">
          MyCareer
        </Link>
        {allowedItems.map((item, index) => (
          <div key={index}>
            {intl.messages[item.key] && (
              <NavLink
                end
                to={item.to}
                key={item.key}
                className={({ isActive }) => `${isActive ? 'item active' : 'item'}`}
              >
                {intl.formatMessage({ id: item.key })}
              </NavLink>
            )}
          </div>
        ))}
      </div>

      <button className="logout-btn" onClick={logoutHandler}>
        {intl.messages.logout && intl.formatMessage({ id: 'logout' })}
      </button>
    </StyledAdminNav>
  );
};
