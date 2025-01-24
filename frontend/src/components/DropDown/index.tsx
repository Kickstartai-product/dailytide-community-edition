import { memo } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

type DropDownProps = {
  options: string[];
  onChange: (value: string) => void;
  value?: string;
  style?: string;
};

const CustomDropDown = ({
  options,
  onChange,
  style,
  value,
}: DropDownProps): JSX.Element => {
  return (
    <select
      className={classNames(styles.select, style)}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        onChange(e.target.value);
      }}
      value={value}
    >
      {options &&
        options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
    </select>
  );
};

export default memo(CustomDropDown);
