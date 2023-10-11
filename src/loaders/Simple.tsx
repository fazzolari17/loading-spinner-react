import React from 'react';
import {
  DEFAULT_ARIA_ATTRIBUTES,
  DEFAULT_COLOR,
  DEFAULT_SIZE,
  BaseProps,
} from '../type';

export interface SimpleLoaderProps extends BaseProps {
  spinDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | '';
  easingFunction?: 'ease-in-out' | 'linear' | 'ease' | string;
  spinSpeed?: number;
  spinDuration?: 'infinite' | string;
  smallSpinArc?: boolean;
}

export interface Styles {
  loaderContainer: React.CSSProperties;
  customSpinner: React.CSSProperties;
  smallSpinArcSize: React.CSSProperties;
  largeSpinArcSize: React.CSSProperties;
}

export const DEFAULT_VALUES = {
  visible: true,
  color: DEFAULT_COLOR,
  size: DEFAULT_SIZE,
  className: '',
  ariaLabel: 'simple-loading-spinner',
  spinDirection: 'normal',
  easingFunction: 'linear',
  spinSpeed: 1,
  spinDuration: 'infinite',
  spinnerSize: '4px',
  smallSpinArc: true,
};

const Simple = ({
  visible = DEFAULT_VALUES.visible,
  size = DEFAULT_VALUES.size,
  color = DEFAULT_VALUES.color,
  spinDirection = DEFAULT_VALUES.spinDirection as SimpleLoaderProps['spinDirection'],
  spinSpeed = DEFAULT_VALUES.spinSpeed,
  spinDuration = DEFAULT_VALUES.spinDuration,
  spinnerSize = DEFAULT_VALUES.spinnerSize,
  smallSpinArc = DEFAULT_VALUES.smallSpinArc,
  easingFunction = DEFAULT_VALUES.easingFunction,
  style = {},
  className = DEFAULT_VALUES.className,
  ariaLabel = DEFAULT_VALUES.ariaLabel,
  ...rest
}: SimpleLoaderProps): React.JSX.Element | null => {
  const spinSpeedArray = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

  const keyFrames = `
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
  `;

  const styles: Styles = {
    loaderContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      maxWidth: 'fit-content',
      borderRadius: '50%',
    },
    customSpinner: {
      border: `${spinnerSize} solid ${color}`,
      borderRadius: '50%',
      width: `${size}`,
      height: `${size}`,
      animation: `spin ${spinSpeedArray[spinSpeed]}s ${easingFunction} ${spinDuration} ${spinDirection}`,
    },
    smallSpinArcSize: {
      borderTop: `${spinnerSize} solid transparent`,
      borderRight: `${spinnerSize} solid transparent`,
    },
    largeSpinArcSize: {
      borderTop: `${spinnerSize} solid transparent`,
    },
  };

  const spinArcSize = smallSpinArc
    ? styles.smallSpinArcSize
    : styles.largeSpinArcSize;

  return !visible ? null : (
    <>
      <style>{keyFrames}</style>
      <div
        style={styles.loaderContainer}
        data-testid="simple-loader"
        aria-label={ariaLabel}
        {...DEFAULT_ARIA_ATTRIBUTES}
        {...rest}
      >
        <div
          className={className}
          style={{ ...styles.customSpinner, ...spinArcSize, ...style }}
        ></div>
      </div>
    </>
  );
};

export default Simple;
