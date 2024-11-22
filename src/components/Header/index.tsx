import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { LanguageSwitcher, MobileMenu, Navbar } from 'components';
import { StyledHeader } from './style';
import { BurgerButton } from 'ui';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.querySelector('html')?.classList.toggle('no_scroll', menuOpen);
  }, [menuOpen]);

  return (
    <StyledHeader>
      <div className="container header__inner">
        <Link to={'/'} className="logo">
          MyCareer
        </Link>

        <Navbar />

        <div className="language-switcher-wrapper desktop-hidden"><LanguageSwitcher /></div>

        <BurgerButton onClick={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />

        {menuOpen && (
          <>
            <div className="blur"></div>
            <MobileMenu setMenuOpen={setMenuOpen} />
          </>
        )}
      </div>
    </StyledHeader>
  );
};
