import React from 'react';
import { 
  SpinningCoinProps, 
  SpinningCoinStyles, 
  SPINNINGCOIN_DEFAULT_VALUES, 
  DEFAULT_ARIA_ATTRIBUTES 
} from '../type';



const SpinningCoin = ({
  visible = SPINNINGCOIN_DEFAULT_VALUES.visible,
  size = SPINNINGCOIN_DEFAULT_VALUES.size,
  color = SPINNINGCOIN_DEFAULT_VALUES.color,
  spinnerSpeed = SPINNINGCOIN_DEFAULT_VALUES.spinnerSpeed,
  spinDirection = SPINNINGCOIN_DEFAULT_VALUES.spinDirection as SpinningCoinProps['spinDirection'],
  className = SPINNINGCOIN_DEFAULT_VALUES.className,
  ariaLabel = SPINNINGCOIN_DEFAULT_VALUES.ariaLabel,
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

  const style: SpinningCoinStyles = {
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
