import { memo } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

type RowProps = {
  children: string | JSX.Element | JSX.Element[] | undefined;
  size?: string;
  style?: string;
  dataTestId?: string;
};

const Row = (props: RowProps): JSX.Element => {
  const { children, size, style, dataTestId } = props;

  const sizeStyle = size ? styles[`row-${size}`] : '';
  return (
    <div
      className={classNames(styles.row, style, sizeStyle)}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};

export default memo(Row);
