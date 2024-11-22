import React from 'react';
import { Progress as AntdProgress } from 'antd';
import { ProgressGradient, ProgressSize, ProgressType, SuccessProps } from 'antd/es/progress/progress';

export interface ProgressProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  type?: ProgressType;
  percent?: number;
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  status?: any;
  showInfo?: boolean;
  strokeLinecap?: 'butt' | 'square' | 'round';
  strokeColor?: string | string[] | ProgressGradient;
  trailColor?: string;
  width?: number;
  success?: SuccessProps;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: number | [number | string, number] | ProgressSize;
  steps?: number;
  successPercent?: number;
  children?: React.ReactNode;
}

export const Progress = ({ percent, type, showInfo, size }: ProgressProps) => {
  return <AntdProgress percent={percent} type={type} showInfo={showInfo} size={size} />;
};
