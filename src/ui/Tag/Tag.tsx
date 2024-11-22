import React from 'react';
import { Tag as AntdTag } from 'antd';
import { LiteralUnion } from 'antd/es/_util/type';
import { PresetColorType, PresetStatusColorType } from 'antd/es/_util/colors';

export interface TagProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  color?: LiteralUnion<PresetColorType | PresetStatusColorType>;
  closable?: boolean;
  closeIcon?: boolean | React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  bordered?: boolean;
  children?: React.ReactNode | string;
}

export const Tag = ({ className, color, children, closable, onClose }: TagProps) => {
  return (
    <AntdTag className={className} color={color} closable={closable} onClose={onClose}>
      {children}
    </AntdTag>
  );
};
