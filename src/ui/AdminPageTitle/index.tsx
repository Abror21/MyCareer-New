import React from 'react'
import { StyledAdminPageTitle } from './style';

interface AdminPageTitleProps{
    label: any;
}

export const AdminPageTitle = ({ label }: AdminPageTitleProps) => {
  return (
    <StyledAdminPageTitle>{label}</StyledAdminPageTitle>
  )
}