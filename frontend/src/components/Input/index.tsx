'use client';

import { memo } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

export type InputProps = {
  value?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  min?: string;
  max?: string;
  step?: string;
  pattern?: string;
  title?: string;
  maxLength?: number;
  minLength?: number;
  readOnly?: boolean;
  size?: number;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  inputType?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search' | 'number' | 'textarea' | 'password';
  multiple?: boolean;
  patternMismatch?: boolean;
  handleChange?: (value: string) => void;
  dataTestId?: string;
  rows?: number;
  error?: string;
};

const Input = (props: InputProps): JSX.Element => {
  const {
    value,
    placeholder = 'Enter text',
    type,
    className,
    style,
    name,
    id,
    disabled,
    required,
    autoFocus,
    autoComplete,
    min,
    max,
    step,
    pattern,
    title,
    maxLength,
    minLength,
    readOnly,
    size,
    inputMode,
    inputType,
    multiple,
    dataTestId,
    rows,
    handleChange,
    error,
  } = props;

  const onTextChange = (value: string) => {
    if (handleChange) handleChange(value);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputTitle}>{title}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          placeholder={placeholder}
          className={classNames(styles.input, className)}
          style={style}
          name={name}
          id={id}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          readOnly={readOnly}
          data-testid={dataTestId}
          rows={rows}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onTextChange(e.target.value)}
        />
      ) : (
        <>
          <input
            value={value}
            type={inputType}
            placeholder={placeholder}
            className={classNames(styles.input, className)}
            style={style}
            name={name}
            id={id}
            disabled={disabled}
            required={required}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            min={min}
            max={max}
            step={step}
            pattern={pattern}
            title={title}
            maxLength={maxLength}
            minLength={minLength}
            readOnly={readOnly}
            size={size}
            inputMode={inputMode}
            multiple={multiple}
            data-testid={dataTestId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTextChange(e.target.value)}
          />
        </>
      )}
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  );
};

export default memo(Input);
