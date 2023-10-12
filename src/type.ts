import React, { HTMLProps} from 'react';

export const DEFAULT_COLOR = '#1976d2';
export const DEFAULT_SIZE = '30px';

export const DEFAULT_ARIA_ATTRIBUTES = {
  'aria-busy': true,
  role: 'status',
};

export interface BaseProps extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  visible?: boolean;
  size?: number | string | undefined;
  color?: string;
  spinnerSize?: string;
  style?: React.CSSProperties | {};
  className?: string;
  ariaLabel?: string;
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++ ADVANCED +++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export interface AdvancedStyles {
  ldsRing: React.CSSProperties;
  ldsRingDiv: React.CSSProperties;
  textAnimation: React.CSSProperties;
  text: React.CSSProperties;
}

export interface AdvancedSpinnerProps extends BaseProps {
  spinnerSize?: string;
  speed?: number;
  styles?: React.CSSProperties;
  className?: string;
  ariaLabel?: string;
  spinDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  text?: string;
  textColor?: string;
  textAnimation?: boolean;
  displayText?: boolean;
  fontFamily?: string;
  fontSize?: string;
}

export const ADVANCED_DEFAULT_VALUES = {
  visible: true,
  size: DEFAULT_SIZE,
  color: DEFAULT_COLOR,
  text: 'LOADING...',
  textColor: '#D6E3F6',
  textAnimation: true,
  displayText: false,
  fontFamily: 'inherit',
  fontSize: '15px',
  spinnerSize: '4px',
  speed: 1.2,
  className: '',
  ariaLabel: 'advanced-loader',
  spinDirection: 'normal',
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++ DOUBLE +++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export interface DoubleStyles {
  spinContainer: React.CSSProperties;
  spin: React.CSSProperties;
  loader2: React.CSSProperties;
  loader3: React.CSSProperties;
  loader4: React.CSSProperties;
  text: React.CSSProperties;
  textAnimation: React.CSSProperties;
}

export interface DoubleSpinnerProps extends Omit<BaseProps, 'color'> {
  colors?: string[] | undefined;
  text?: string;
  textColor?: string;
  textAnimation?: boolean;
  displayText?: boolean;
  fontFamily?: string;
  fontSize?: string;
}

export const DOUBLE_DEFAULT_VALUES = {
  visible: true,
  size: 150,
  colors: ['#0D4B9F', '#E0EDFF', '#005CDC', '#94B6E5'],
  text: 'LOADING...',
  textColor: '#D6E3F6',
  textAnimation: true,
  displayText: true,
  fontFamily: 'inherit',
  fontSize: '15px',
  spinnerSize: '3px',
  ariaLabel: 'double-loader',
  className: '',
  style: {}
};


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++ HELIX +++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export interface HelixProps extends Omit<BaseProps & React.SVGProps<SVGSVGElement>, 'color'> {
  primaryColor?: string[];
  secondaryColor?: string[];
  className?: string;
  style?: React.CSSProperties;
}

export const HELIX_DEFAULT_VALUES = {
  visible: true,
  size: DEFAULT_SIZE,
  ariaLabel: 'helix-svg-loader',
  primaryColor: ['#E90C5983', '#ff0033'],
  secondaryColor: ['#46dff0', '#353A3925'],
};


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++ HOURGLASS +++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export interface HourglassStyles {
  hourglassWrapper: React.CSSProperties;
  hourglassDiv: React.CSSProperties;
}

export interface HourglassProps extends BaseProps {
  spinDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | '';
  speed?: number;
}

export const HOURGLASS_DEFAULT_VALUES = {
  visible: true,
  size: DEFAULT_SIZE,
  color: DEFAULT_COLOR,
  spinDirection: 'normal',
  speed: 1.2,
  ariaLabel: 'hourglass-loader',
  className: '',
  style: {},
};


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++ SIMPLE +++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export interface SimpleLoaderProps extends BaseProps {
  spinDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | '';
  easingFunction?: 'ease-in-out' | 'linear' | 'ease' | string;
  speed?: number;
  spinDuration?: 'infinite' | string;
  smallSpinArc?: boolean;
}

export interface SimpleLoaderStyles {
  loaderContainer: React.CSSProperties;
  customSpinner: React.CSSProperties;
  smallSpinArcSize: React.CSSProperties;
  largeSpinArcSize: React.CSSProperties;
}

export const SIMPLE_DEFAULT_VALUES = {
  visible: true,
  color: DEFAULT_COLOR,
  size: DEFAULT_SIZE,
  className: '',
  ariaLabel: 'simple-loader',
  spinDirection: 'normal',
  easingFunction: 'linear',
  speed: 0.3,
  spinDuration: 'infinite',
  spinnerSize: '4px',
  smallSpinArc: true,
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++ SPINNING-COIN+++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export interface SpinningCoinProps extends Omit<BaseProps, 'spinnerSize'> {
  speed?: number;
  styles?: React.CSSProperties;
  className?: string;
  ariaLabel?: string;
  spinDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

export interface SpinningCoinStyles {
  ldsCircle: React.CSSProperties;
  ldsCircleDiv: React.CSSProperties;
}

export const SPINNINGCOIN_DEFAULT_VALUES = {
  visible: true,
  size: '30px',
  color: '#1976d2',
  spinnerSize: '4px',
  speed: 2.4,
  className: '',
  ariaLabel: 'spinning-coin-loader',
  spinDirection: 'normal',
};


export default {
  DEFAULT_COLOR,
  DEFAULT_SIZE,
  DEFAULT_ARIA_ATTRIBUTES,
  ADVANCED_DEFAULT_VALUES,
  DOUBLE_DEFAULT_VALUES,
  HELIX_DEFAULT_VALUES,
  HOURGLASS_DEFAULT_VALUES,
  SIMPLE_DEFAULT_VALUES,
  SPINNINGCOIN_DEFAULT_VALUES
}