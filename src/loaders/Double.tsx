import React from 'react';
import { BaseProps } from '../type';
import { convertCssSizeToNumber } from '../helperFunctions';

export interface Styles {
  spinContainer: React.CSSProperties;
  spin: React.CSSProperties;
  loader2: React.CSSProperties;
  loader3: React.CSSProperties;
  loader4: React.CSSProperties;
  text: React.CSSProperties;
  textAnimation: React.CSSProperties;
}

interface DoubleSpinnerProps extends Omit<BaseProps, 'color'> {
  color?: string[] | undefined;
  text?: string;
  textColor?: string;
  textAnimation?: boolean;
  displayText?: boolean;
  fontFamily?: string;
  fontSize?: string;
}

export const DEFAULT_WAI_ARIA_ATTRIBUTE = {
  'aria-busy': true,
  role: 'status',
};

export const DEFAULT_VALUES = {
  visible: true,
  size: 150,
  color: ['#0D4B9F', '#E0EDFF', '#005CDC', '#94B6E5'],
  text: 'LOADING...',
  textColor: '#D6E3F6',
  textAnimation: true,
  displayText: true,
  fontFamily: 'inherit',
  fontSize: '15px',
  spinnerSize: '3px',
  ariaLabel: 'double-spinner-loader',
  className: '',
  style: {}
};

const Double = ({
  visible = DEFAULT_VALUES.visible,
  size = DEFAULT_VALUES.size,
  color = DEFAULT_VALUES.color,
  text = DEFAULT_VALUES.text,
  textColor = DEFAULT_VALUES.textColor,
  textAnimation = DEFAULT_VALUES.textAnimation,
  displayText = DEFAULT_VALUES.displayText,
  fontFamily = DEFAULT_VALUES.fontFamily,
  fontSize = DEFAULT_VALUES.fontSize,
  spinnerSize = DEFAULT_VALUES.spinnerSize,
  ariaLabel = DEFAULT_VALUES.ariaLabel,
  className = DEFAULT_VALUES.className,
  style = DEFAULT_VALUES.style,
  ...rest
}: DoubleSpinnerProps) => {
  let number; 
  let unit = 'px';

  if(typeof size === 'number') {
    number = size;
    unit = 'px';
  } else if (typeof size === 'string') {
    const converted = convertCssSizeToNumber(size);
    number = converted.number;
    unit = converted.unit;
  } else if (number === undefined) {
    throw new Error();
  }
  const keyframesAnimation = `
    @keyframes rotate {
      0% {
        transform: rotateZ(-360deg)
      }
      100% {
        transform: rotateZ(0deg)
      }
    }
    @keyframes rotate-reverse {
      0% {
        transform: rotateZ(360deg)
      }
      100% {
        transform: rotateZ(0deg)
      }
    }
    @keyframes flash {
      0%, 50%, 100% {
        opacity: 1;
      }
      25%, 75% {
        opacity: 0;
      }
    }`;

  const styles: Styles = {
    spinContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: `${number}${unit}`,
      height: `${number}${unit}`,
    },
    spin: {
      border: `${spinnerSize} solid ${color[0]}`,
      width: `${number}${unit}`,
      height: `${number}${unit}`,
      boxSizing: 'border-box',
      position: `absolute`,
      borderRadius: '50%',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      animation: 'rotate 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite',
    },
    loader2: {
      border: `${spinnerSize} solid ${color[1]}`,
      width: `${number - (number * 0.1)}${unit}`,
      height: `${number - (number * 0.1)}${unit}`,
      animation:
        'rotate-reverse 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite',
      zIndex: 1,
    },
    loader3: {
      border: `${spinnerSize} solid ${color[2]}`,
      width: `${number - (number * 0.2)}${unit}`,
      height: `${number - (number * 0.2)}${unit}`,
      animation: 'rotate 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite',
      zIndex: 2,
    },
    loader4: {
      border: `${spinnerSize} solid ${color[3]}`,
      width: `${number - (number * 0.3)}${unit}`,
      height: `${number - (number * 0.3)}${unit}`,
      animation:
        'rotate-reverse 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite',
      zIndex: 2,
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

  return !visible ? null : (
    <>
      <style>{keyframesAnimation}</style>
      <div
        style={{ ...styles.spinContainer, ...style }}
        aria-label={ariaLabel}
        className={className}
        {...DEFAULT_WAI_ARIA_ATTRIBUTE}
        {...rest}
      >
        <div style={styles.spin}></div>
        <div style={{ ...styles.spin, ...styles.loader2 }}></div>
        <div style={{ ...styles.spin, ...styles.loader3 }}></div>
        <div style={{ ...styles.spin, ...styles.loader4 }}></div>
        <span style={{ ...styles.text, ...flashingText }}>{innerText}</span>
      </div>
    </>
  );
};

export default Double;
