'use client';

import { memo } from 'react';
import Form from 'react-bootstrap/Form';
import classNames from 'classnames';
import styles from './index.module.scss';

type SwitchProps = {
  label?: string;
  size?: 'sm' | 'lg';
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: string;
  dataTestId?: string;
};

const Switch = ({
  label,
  checked,
  disabled,
  onChange,
  size,
  style,
  dataTestId,
}: SwitchProps): JSX.Element => {
  return (
    <Form.Check
      label={label || ''}
      disabled={disabled}
      onChange={onChange}
      checked={checked}
      type="switch"
      className={classNames(styles[`switch-${size}`], style)}
      data-testid={dataTestId}
    />
  );
};
export default memo(Switch);
