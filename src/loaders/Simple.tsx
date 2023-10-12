import React from 'react';
import {
  SimpleLoaderProps,
  SimpleLoaderStyles,
  DEFAULT_ARIA_ATTRIBUTES,
  SIMPLE_DEFAULT_VALUES
} from '../type';



const Simple = ({
  visible = SIMPLE_DEFAULT_VALUES.visible,
  size = SIMPLE_DEFAULT_VALUES.size,
  color = SIMPLE_DEFAULT_VALUES.color,
  spinDirection = SIMPLE_DEFAULT_VALUES.spinDirection as SimpleLoaderProps['spinDirection'],
  speed = SIMPLE_DEFAULT_VALUES.speed,
  spinDuration = SIMPLE_DEFAULT_VALUES.spinDuration,
  spinnerSize = SIMPLE_DEFAULT_VALUES.spinnerSize,
  smallSpinArc = SIMPLE_DEFAULT_VALUES.smallSpinArc,
  easingFunction = SIMPLE_DEFAULT_VALUES.easingFunction,
  style = {},
  className = SIMPLE_DEFAULT_VALUES.className,
  ariaLabel = SIMPLE_DEFAULT_VALUES.ariaLabel,
  ...rest
}: SimpleLoaderProps): React.JSX.Element | null => {

  const keyFrames = `
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
  `;

  const styles: SimpleLoaderStyles = {
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
      animation: `spin ${speed}s ${easingFunction} ${spinDuration} ${spinDirection}`,
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
