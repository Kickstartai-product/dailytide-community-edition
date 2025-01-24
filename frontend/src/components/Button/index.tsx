'use client';

import dynamic from 'next/dynamic';
import classNames from 'classnames';
import styles from './index.module.scss';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';

const FontAwesomeIcon = dynamic(
  () => import('@fortawesome/react-fontawesome').then((module) => module.FontAwesomeIcon),
  { ssr: false },
);

type ButtonProps = {
  text?: string;
  id?: string;
  style?: string;
  icon?: IconProp | IconDefinition;
  dataTestId?: string;
  disabled?: boolean;
  ariaLabel?: string;
  isDark?: boolean;
  outline?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
};

const Button = ({
  text,
  id,
  style,
  onClick,
  dataTestId,
  outline,
  icon,
  disabled = false,
  ariaLabel,
  type,
  isDark,
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={classNames(
        styles.button,
        disabled && styles.disabled,
        outline && styles.outline,
        isDark && styles.dark,
        style,
      )}
      id={id}
      onClick={onClick}
      data-testid={dataTestId}
      aria-label={ariaLabel}
      type={type}
    >
      {isDark}
      {icon ? <FontAwesomeIcon icon={icon} className={styles.icon} /> : null}
      {text}
    </button>
  );
};

export default Button;
