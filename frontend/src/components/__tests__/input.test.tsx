import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '@/components';
import { describe, it, expect } from '@jest/globals';

describe('Input component', () => {
  const handleChange = jest.fn();

  it('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(
      <Input value="" handleChange={handleChange} placeholder="Enter text" />,
    );
    const inputElement = getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders correctly with provided props', () => {
    const { getByTestId } = render(
      <Input
        value="Hello"
        placeholder="Enter text"
        type="text"
        className="custom-class"
        style={{ color: 'red' }}
        name="inputName"
        id="inputId"
        disabled={true}
        required={true}
        autoFocus={true}
        autoComplete="off"
        min="0"
        max="100"
        step="1"
        pattern="[A-Za-z]+"
        title="Input title"
        maxLength={10}
        minLength={3}
        readOnly={true}
        size={20}
        inputMode="text"
        multiple={true}
        handleChange={handleChange}
        dataTestId="input-element"
      />,
    );

    const inputElement = getByTestId('input-element');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveClass('custom-class');
    expect(inputElement).toHaveStyle('color: red');
    // ... add more assertions for other props
  });

  it('calls handleChange function on input change', () => {
    const { getByPlaceholderText } = render(
      <Input value="" handleChange={handleChange} />,
    );
    const inputElement = getByPlaceholderText('Enter text');

    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    expect(handleChange).toHaveBeenCalledWith('New Value');
  });
});
