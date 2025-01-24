'use client';

import Link from 'next/link';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import classNames from 'classnames';

export default function Unauthorized() {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);

  return (
    <div className={classNames(styles.unauthorizedContainer, isDark && styles.dark)}>
      <h1 className={classNames(styles.heading, isDark && styles.dark)}>You are not authorized to view this page</h1>
      <Link href="/auth/signin" className={classNames(styles.backToSigninLink, isDark && styles.dark)}>
        Login
      </Link>
    </div>
  );
}
