import React from 'react';
import { DEFAULT_ARIA_ATTRIBUTES, BaseProps, DEFAULT_SIZE, DEFAULT_COLOR } from '../type';

interface Styles {
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

export const DEFAULT_VALUES = {
  visible: true,
  size: DEFAULT_SIZE,
  color: DEFAULT_COLOR,
  text: 'LOADING...',
  textColor: '#D6E3F6',
  textAnimation: true,
  displayText: true,
  fontFamily: 'inherit',
  fontSize: '15px',
  spinnerSize: '4px',
  speed: 1.2,
  className: '',
  ariaLabel: 'advanced-loading-spinner',
  spinDirection: 'normal',
};

const Advanced = ({
  visible = DEFAULT_VALUES.visible,
  size = DEFAULT_VALUES.size,
  color = DEFAULT_VALUES.color,
  text = DEFAULT_VALUES.text,
  textColor = DEFAULT_VALUES.textColor,
  textAnimation = DEFAULT_VALUES.textAnimation,
  displayText = DEFAULT_VALUES.displayText,
  fontFamily = DEFAULT_VALUES.fontFamily,
  fontSize = DEFAULT_VALUES.fontSize,
  speed = DEFAULT_VALUES.speed,
  spinnerSize = DEFAULT_VALUES.spinnerSize,
  spinDirection = DEFAULT_VALUES.spinDirection as AdvancedSpinnerProps['spinDirection'],
  style,
  className = DEFAULT_VALUES.className,
  ariaLabel = DEFAULT_VALUES.ariaLabel,
  ...rest
}: AdvancedSpinnerProps ) => {

  if(typeof size === 'number') {
    size = `${size}px`
  }

  const keyFrames = `
    @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes flash {
    0%, 50%, 100% {
      opacity: 1;
    }
    25%, 75% {
      opacity: 0;
    }
  }
  `;

  const styles: Styles = {
    ldsRing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: `${size}`,
      height: `${size}`,
    },
    ldsRingDiv: {
      boxSizing: `border-box`,
      display: `block`,
      position: `absolute`,
      width: `${size}`,
      height: `${size}`,
      border: `${spinnerSize} solid ${color}`,
      borderRadius: `50%`,
      animation: `lds-ring ${speed}s cubic-bezier(0.5, 0, 0.5, 1) infinite ${spinDirection}`,
      borderColor: `${color} transparent transparent transparent`,
    },
    text: {
      color: `${textColor}`,
      fontFamily: `${fontFamily}`,
      fontSize: `${fontSize}`,
      position: 'absolute',
      zIndex: 3,
    },
    textAnimation: {
      animation: 'flash 2s ease-in-out infinite',
    },
  };

  const flashingText = textAnimation ? styles.textAnimation : {};
  const innerText = displayText ? text : null;

  const spinDirectionDivArrangement =
    spinDirection === 'reverse' || spinDirection === 'alternate-reverse' ? (
      <>
        <div style={{ ...styles.ldsRingDiv, animationDelay: '-0.15s' }}></div>
        <div style={{ ...styles.ldsRingDiv, animationDelay: '-0.3s' }}></div>
        <div style={{ ...styles.ldsRingDiv, animationDelay: '-0.45s' }}></div>
      </>
    ) : (
      <>
        <div style={{ ...styles.ldsRingDiv, animationDelay: '-0.45s' }}></div>
        <div style={{ ...styles.ldsRingDiv, animationDelay: '-0.3s' }}></div>
        <div style={{ ...styles.ldsRingDiv, animationDelay: '-0.15s' }}></div>
      </>
    );

  return !visible ? null : (
    <>
      <style>{keyFrames}</style>
      <div
        style={{ ...styles.ldsRing, ...styles }}
        className={`${className}`}
        aria-label={ariaLabel}
        {...DEFAULT_ARIA_ATTRIBUTES}
        {...rest}
      >
        <div style={{ ...styles.ldsRingDiv }}></div>
        <span style={{ ...styles.text, ...flashingText }}>{innerText}</span>
        {spinDirectionDivArrangement}
      </div>
    </>
  );
};

export default Advanced;
