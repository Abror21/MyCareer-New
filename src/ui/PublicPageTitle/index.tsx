import React from 'react'
import { StyledPublicPageTitle } from './style'

interface PublicPageTitleProps {
    label: string | undefined;
}

export const PublicPageTitle = ({ label }: PublicPageTitleProps) => {
  return (
    <StyledPublicPageTitle>{label}</StyledPublicPageTitle>
  )
}