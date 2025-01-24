'use client';
import { memo } from 'react';
import dynamic from 'next/dynamic';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import styles from './index.module.scss';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

const Button = dynamic(() => import('@/components/Button').then((module) => module.default), { ssr: false });

export type CommentsIndicatorProps = {
  id: string;
  commentsCount?: number;
};

const CommentsIndicator = ({ commentsCount }: CommentsIndicatorProps) => {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);
  return (
    <div className={styles.commentsIndicatorContainer}>
      <Button
        style={classNames(styles.iconButton, isDark && styles.dark)}
        icon={faComment as IconDefinition}
        ariaLabel="Comment this article"
      />
      <span className={classNames(styles.text, isDark && styles.dark)}>{commentsCount}</span>
    </div>
  );
};

export default memo(CommentsIndicator);
