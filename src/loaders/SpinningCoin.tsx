import React from 'react';
import { BaseProps, DEFAULT_ARIA_ATTRIBUTES } from '../type';

export interface SpinningCoinProps extends Omit<BaseProps, 'spinnerSize'> {
  spinnerSpeed?: number;
  styles?: React.CSSProperties;
  className?: string;
  ariaLabel?: string;
  spinDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

export const DEFAULT_VALUES = {
  visible: true,
  size: '30px',
  color: '#1976d2',
  spinnerSize: '4px',
  spinnerSpeed: 1,
  className: '',
  ariaLabel: 'spinning-coin-loader',
  spinDirection: 'normal',
};

const SpinningCoin = ({
  visible = DEFAULT_VALUES.visible,
  size = DEFAULT_VALUES.size,
  color = DEFAULT_VALUES.color,
  spinnerSpeed = DEFAULT_VALUES.spinnerSpeed,
  spinDirection = DEFAULT_VALUES.spinDirection as SpinningCoinProps['spinDirection'],
  className = DEFAULT_VALUES.className,
  ariaLabel = DEFAULT_VALUES.ariaLabel,
  styles,
  ...rest
}: SpinningCoinProps) => {
  const speed = [2.2, 2.4, 2.6];

  const keyframeAnimation = `
    @keyframes spin-coin {
      0%, 100% {
        animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
      },
      0% {
        transform: rotateY(0deg);
      }
      50% {
        transform: rotateY(1800deg);
        animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
      }
      100% {
        transform: rotateY(3600deg);
      }
    }
  `;
  interface Style {
    ldsCircle: React.CSSProperties;
    ldsCircleDiv: React.CSSProperties;
  }

  const style: Style = {
    ldsCircle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      maxWidth: 'fit-content',
      // transform: 'translateZ(1px)',
    },
    ldsCircleDiv: {
      width: `${size}`,
      height: `${size}`,
      // margin: '8px',
      borderRadius: '50%',
      background: `${color}`,
      animation: `spin-coin ${speed[spinnerSpeed]}s cubic-bezier(0, 0.2, 0.8, 1) infinite ${spinDirection}`,
    },
  };

  return !visible ? null : (
    <>
      <style>{keyframeAnimation}</style>
      <div
        className={className}
        style={{ ...style.ldsCircle, ...styles }}
        aria-label={ariaLabel}
        {...DEFAULT_ARIA_ATTRIBUTES}
        {...rest}
      >
        <div style={{ ...style.ldsCircleDiv }}></div>
      </div>
    </>
  );
};

export default SpinningCoin;
