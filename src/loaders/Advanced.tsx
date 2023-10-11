import React from 'react';
import { 
  AdvancedSpinnerProps,
  AdvancedStyles,
  DEFAULT_ARIA_ATTRIBUTES, 
  ADVANCED_DEFAULT_VALUES 
} from '../type';



const Advanced = ({
  visible = ADVANCED_DEFAULT_VALUES.visible,
  size = ADVANCED_DEFAULT_VALUES.size,
  color = ADVANCED_DEFAULT_VALUES.color,
  text = ADVANCED_DEFAULT_VALUES.text,
  textColor = ADVANCED_DEFAULT_VALUES.textColor,
  textAnimation = ADVANCED_DEFAULT_VALUES.textAnimation,
  displayText = ADVANCED_DEFAULT_VALUES.displayText,
  fontFamily = ADVANCED_DEFAULT_VALUES.fontFamily,
  fontSize = ADVANCED_DEFAULT_VALUES.fontSize,
  speed = ADVANCED_DEFAULT_VALUES.speed,
  spinnerSize = ADVANCED_DEFAULT_VALUES.spinnerSize,
  spinDirection = ADVANCED_DEFAULT_VALUES.spinDirection as AdvancedSpinnerProps['spinDirection'],
  style,
  className = ADVANCED_DEFAULT_VALUES.className,
  ariaLabel = ADVANCED_DEFAULT_VALUES.ariaLabel,
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

  const styles: AdvancedStyles = {
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
        {spinDirectionDivArrangement}
        <span style={{ ...styles.text, ...flashingText }}>{innerText}</span>
      </div>
    </>
  );
};

export default Advanced;
