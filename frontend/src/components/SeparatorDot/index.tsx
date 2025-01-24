'use client';

import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import type { RootState } from '@/redux/store';
import classNames from 'classnames';

const SeparatorDot = (): JSX.Element => {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);
  return <div className={classNames(styles.dot, isDark && styles.dark)}></div>;
};

export default SeparatorDot;
