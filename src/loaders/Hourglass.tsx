import React from 'react';
import {
  HourglassProps,
  HourglassStyles,
  HOURGLASS_DEFAULT_VALUES,
  DEFAULT_ARIA_ATTRIBUTES,
} from '../type';



const Hourglass = ({
  visible = HOURGLASS_DEFAULT_VALUES.visible,
  color = HOURGLASS_DEFAULT_VALUES.color,
  size = HOURGLASS_DEFAULT_VALUES.size,
  className = HOURGLASS_DEFAULT_VALUES.className,
  ariaLabel = HOURGLASS_DEFAULT_VALUES.ariaLabel,
  spinDirection = HOURGLASS_DEFAULT_VALUES.spinDirection as HourglassProps['spinDirection'],
  speed = HOURGLASS_DEFAULT_VALUES.speed,
  style = HOURGLASS_DEFAULT_VALUES.style,
  ...rest
}: HourglassProps) => {

  if(typeof size === 'number') {
    size = `${size}px`
  }

  const keyframesAnimation = `
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
`;
  const styles: HourglassStyles = {
    hourglassWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: 'fit-content',
      height: 'fit-content',
    },
    hourglassDiv: {
      borderRadius: '50%',
      border: `${size} solid ${color}`,
      borderColor: `${color} transparent ${color} transparent`,
      animation: `lds-hourglass ${speed}s infinite ${spinDirection}`,
    },
  };

  return !visible ? null : (
    <>
      <style>{keyframesAnimation}</style>
      <div
        className={className}
        style={{...styles.hourglassWrapper, ...style}}
        aria-label={ariaLabel}
        {...DEFAULT_ARIA_ATTRIBUTES}
        {...rest}
      >
        <div style={styles.hourglassDiv}></div>
      </div>
    </>
  );
};

export default Hourglass;
