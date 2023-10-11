import React from 'react';
import { Simple } from '../../src';
import { render } from '@testing-library/react';
import { DEFAULT_VALUES } from '../../src/loaders/Simple';
import { DEFAULT_ARIA_ATTRIBUTES } from '../../src/type';
import '@testing-library/jest-dom/';
import '@testing-library/jest-dom/jest-globals';

describe('Simple Loader', () => {
  it('should render to screen with default props', () => {
    const { getByTestId } = render(<Simple />);
    const loaderContainer = getByTestId('simple-loader');
    const loader = loaderContainer.firstChild;

    expect(loaderContainer).toBeInTheDocument();

    expect(loaderContainer).toHaveStyle('display: flex');
    expect(loaderContainer).toHaveStyle('justify-content: center');
    expect(loaderContainer).toHaveStyle('align-items: center');
    // Correct Aria Attributes
    expect(loaderContainer).toHaveAttribute(
      'role',
      DEFAULT_ARIA_ATTRIBUTES.role
    );
    expect(loaderContainer).toHaveAttribute(
      'aria-busy',
      `${DEFAULT_ARIA_ATTRIBUTES['aria-busy']}`
    );
    expect(loaderContainer).toHaveAttribute(
      'aria-label',
      DEFAULT_VALUES.ariaLabel
    );

    expect(loader).toHaveStyle(
      `border: ${DEFAULT_VALUES.spinnerSize} solid ${DEFAULT_VALUES.color}`
    );
    expect(loader).toHaveStyle(`height: ${DEFAULT_VALUES.size}`);
    expect(loader).toHaveStyle(`width: ${DEFAULT_VALUES.size}`);
    // Check if smallSpinArc is true
    expect(loader).toHaveStyle(
      `border-top: ${DEFAULT_VALUES.spinnerSize} solid transparent`
    );
    expect(loader).toHaveStyle(
      `border-right: ${DEFAULT_VALUES.spinnerSize} solid transparent`
    );
  });
  it('component will display custom aria label instead of default if entered', () => {
    const { getByTestId } = render(<Simple ariaLabel="custom-aria-label" />);
    const loaderContainer = getByTestId('simple-loader');

    expect(loaderContainer).toHaveAttribute('aria-label', 'custom-aria-label');
    expect(loaderContainer).not.toHaveAttribute(
      'aria-label',
      DEFAULT_VALUES.ariaLabel
    );
  });
  it('component will display custom color instead of default if entered', () => {
    const { getByTestId } = render(<Simple color="#000" />);
    const loaderContainer = getByTestId('simple-loader');
    const loader = loaderContainer.firstChild;
    expect(loader).toHaveStyle(
      `border: ${DEFAULT_VALUES.spinnerSize} solid #000`
    );
    expect(loader).not.toHaveStyle(
      `border: ${DEFAULT_VALUES.spinnerSize} solid ${DEFAULT_VALUES.color}`
    );
  });
  it('component will display custom spinnerSize instead of default if entered', () => {
    const { getByTestId } = render(<Simple spinnerSize="8px" />);
    const loaderContainer = getByTestId('simple-loader');
    const loader = loaderContainer.firstChild;
    expect(loader).toHaveStyle(`border: 8px solid ${DEFAULT_VALUES.color}`);
    expect(loader).not.toHaveStyle(
      `border: ${DEFAULT_VALUES.spinnerSize} solid ${DEFAULT_VALUES.color}`
    );
  });
  it('component will display custom className', () => {
    const { getByTestId } = render(<Simple className="custom-class" />);
    const loaderContainer = getByTestId('simple-loader');

    expect(loaderContainer.firstChild).toHaveClass('custom-class');
  });
  it('component will display custom size when entered', () => {
    const { getByTestId } = render(<Simple size="50px" />);
    const loaderContainer = getByTestId('simple-loader');
    const loader = loaderContainer.firstChild;

    expect(loader).toHaveStyle('height: 50px');
    expect(loader).toHaveStyle('width: 50px');

    expect(loader).not.toHaveStyle(`height: ${DEFAULT_VALUES.size}`);
    expect(loader).not.toHaveStyle(`width: ${DEFAULT_VALUES.size}`);
  });
  it('component will display changed spinner size when smallSpinnerArc is set to false', () => {
    const { getByTestId } = render(<Simple smallSpinArc={false} />);
    const loaderContainer = getByTestId('simple-loader');
    const loader = loaderContainer.firstChild;

    expect(loader).toHaveStyle(
      `border-top: ${DEFAULT_VALUES.spinnerSize} solid transparent`
    );
    expect(loader).not.toHaveStyle(
      `border-right: ${DEFAULT_VALUES.spinnerSize} solid transparent`
    );
  });
  it('animation defaults are overwritten when passed to component', () => {
    const { getByTestId } = render(
      <Simple
        spinSpeed={5}
        spinDirection="reverse"
        easingFunction="linear"
        spinDuration="1"
      />
    );
    const spinSpeedArray = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    const loaderContainer = getByTestId('simple-loader');
    const loader = loaderContainer.firstChild;

    expect(loader).toHaveStyle(
      `animation: spin ${'0.7'}s ${'linear'} ${'1'} reverse`
    );
    expect(loader).not.toHaveStyle(
      `animation: spin ${spinSpeedArray[DEFAULT_VALUES.spinSpeed]}s ${
        DEFAULT_VALUES.easingFunction
      } ${DEFAULT_VALUES.spinDuration} ${DEFAULT_VALUES.spinDirection}`
    );
  });
  it('additonal props will pass through', () => {
    const TEST_VALUES = {
      ariaDescription: 'additional-props-will-pass-through'
    }
    const { getByLabelText } = render(<Simple aria-description={TEST_VALUES.ariaDescription} />);
    expect(getByLabelText(DEFAULT_VALUES.ariaLabel)).toHaveAttribute('aria-description', TEST_VALUES.ariaDescription)
  });
  it('will not render when visible is set to false', () => {
    const { container } = render(<Simple visible={false} />);
    expect(container.firstChild).not.toBeInTheDocument();
  });
});
