import React, { HTMLProps} from 'react';

export const DEFAULT_COLOR = '#1976d2';
export const DEFAULT_SIZE = '30px';

export const DEFAULT_ARIA_ATTRIBUTES = {
  'aria-busy': true,
  role: 'status',
};

export const DEFAULT_VALUES = {
  color: '#1976d2',
  size: '30px',
};

export interface BaseProps extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  visible?: boolean;
  size?: number | string | undefined;
  color?: string;
  spinnerSize?: string;
  style?: React.CSSProperties | {};
  className?: string;
  ariaLabel?: string;
  // wrapperStyles?: React.CSSProperties;
}
