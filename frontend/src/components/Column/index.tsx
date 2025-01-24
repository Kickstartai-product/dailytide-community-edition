import { memo } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

type ColumnProps = {
  children: string | JSX.Element | JSX.Element[] | undefined;
  size?: string;
  style?: string;
  dataTestId?: string;
};

const Column = (props: ColumnProps): JSX.Element => {
  const { children, size, style, dataTestId } = props;

  const sizeStyle = size ? styles[`col-${size}`] : '';
  return (
    <div
      className={classNames(styles.column, style, sizeStyle)}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};

export default memo(Column);
