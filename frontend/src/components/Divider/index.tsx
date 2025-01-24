import React from 'react';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import classNames from 'classnames';

const Divider = () => {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);

  return <div className={classNames(styles.divider, isDark && styles.dark)} />;
};

export default Divider;
