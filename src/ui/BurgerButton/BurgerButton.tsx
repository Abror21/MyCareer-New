import React from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { StyledBurgerButton } from './style';

interface BurgerButtonProps {
  menuOpen?: boolean;
  onClick?: () => void;
}

export const BurgerButton = ({ menuOpen, onClick }: BurgerButtonProps) => {
  return (
      <StyledBurgerButton onClick={onClick}>
        {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
      </StyledBurgerButton>);
};