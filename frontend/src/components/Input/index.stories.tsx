import type { ChangeEvent } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import AtomInput, { InputProps } from '../Input/index';

export default {
  title: 'Input',
  argTypes: {
    value: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    onChange: { control: false },
    placeholder: {
      control: 'text',
    },
    type: {
      control: {
        type: 'select',
      },
      options: [
        'email',
        'password',
        'text',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'datetime-local',
        'search',
        'url',
      ],
    },
    className: {
      control: 'text',
    },
    style: { control: false },
    name: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    autoFocus: {
      control: 'boolean',
    },
    autoComplete: {
      control: 'text',
    },
    min: {
      control: 'text',
    },
    max: {
      control: 'text',
    },
    step: {
      control: 'text',
    },
    pattern: {
      control: 'text',
    },
    maxLength: {
      control: 'number',
    },
    minLength: {
      control: 'number',
    },
    readOnly: {
      control: 'boolean',
    },
    size: {
      control: 'number',
    },
    inputMode: {
      control: {
        type: 'select',
      },
      options: ['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'],
    },
    multiple: {
      control: 'boolean',
    },
    dataTestId: {
      control: 'text',
    },
  },
} as Meta;

const Template: StoryFn<InputProps> = ({
  title,
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
  maxLength,
  minLength,
  readOnly,
  size,
  inputMode,
  multiple,
  dataTestId,
}) => (
  <div>
    <AtomInput
      title={title}
      handleChange={(event) => {
        // eslint-disable-next-line no-console
        console.log('handleChange', event);
      }}
      placeholder={placeholder}
      type={type}
      className={className}
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
      maxLength={maxLength}
      minLength={minLength}
      readOnly={readOnly}
      size={size}
      inputMode={inputMode}
      multiple={multiple}
      dataTestId={dataTestId}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Input Title',
  inputMode: 'text',
  type: 'text',
};
