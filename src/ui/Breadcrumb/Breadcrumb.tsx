import React from 'react';
import { StyledBreadcrumb } from './style';
import { BreadcrumbProps } from 'antd';

export const Breadcrumb = ({ items, params, separator = '/' }: BreadcrumbProps) => {
  return <StyledBreadcrumb items={items} params={params} separator={separator}></StyledBreadcrumb>;
};
