import React from 'react';
import { StyledAddMoreButton } from './style';

type AddMoreButtonProps = {
  onClick?: any;
  label?: string;
  disabled?: boolean;
};

export const AddMoreButton = ({ onClick, label, disabled = false }: AddMoreButtonProps) => {
  return <StyledAddMoreButton disabled={disabled} onClick={onClick}>{`+ ${label}`}</StyledAddMoreButton>;
};
