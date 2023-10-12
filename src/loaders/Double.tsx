import React from 'react';
import { convertCssSizeToNumber } from '../helperFunctions';
import { 
  DoubleSpinnerProps, 
  DoubleStyles, 
  DEFAULT_ARIA_ATTRIBUTES, 
  DOUBLE_DEFAULT_VALUES 
} from '../type';



const Double = ({
  visible = DOUBLE_DEFAULT_VALUES.visible,
  size = DOUBLE_DEFAULT_VALUES.size,
  colors = DOUBLE_DEFAULT_VALUES.colors,
  text = DOUBLE_DEFAULT_VALUES.text,
  textColor = DOUBLE_DEFAULT_VALUES.textColor,
  textAnimation = DOUBLE_DEFAULT_VALUES.textAnimation,
  displayText = DOUBLE_DEFAULT_VALUES.displayText,
  fontFamily = DOUBLE_DEFAULT_VALUES.fontFamily,
  fontSize = DOUBLE_DEFAULT_VALUES.fontSize,
  spinnerSize = DOUBLE_DEFAULT_VALUES.spinnerSize,
  ariaLabel = DOUBLE_DEFAULT_VALUES.ariaLabel,
  className = DOUBLE_DEFAULT_VALUES.className,
  style = DOUBLE_DEFAULT_VALUES.style,
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

  const styles: DoubleStyles = {
    spinContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: `${number}${unit}`,
      height: `${number}${unit}`,
    },
    spin: {
      border: `${spinnerSize} solid ${colors[0]}`,
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
      border: `${spinnerSize} solid ${colors[1]}`,
      width: `${number - (number * 0.1)}${unit}`,
      height: `${number - (number * 0.1)}${unit}`,
      animation:
        'rotate-reverse 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite',
      zIndex: 1,
    },
    loader3: {
      border: `${spinnerSize} solid ${colors[2]}`,
      width: `${number - (number * 0.2)}${unit}`,
      height: `${number - (number * 0.2)}${unit}`,
      animation: 'rotate 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite',
      zIndex: 2,
    },
    loader4: {
      border: `${spinnerSize} solid ${colors[3]}`,
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
        {...DEFAULT_ARIA_ATTRIBUTES}
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
