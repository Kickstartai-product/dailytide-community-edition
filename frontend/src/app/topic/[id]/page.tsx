'use client';

import { useCallback } from 'react';
import styles from './index.module.scss';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setShowShareDialog } from '@/redux/reducers/mainReducer';
import { usePathname } from 'next/navigation';

const TopicBody = dynamic(() => import('@/components/TopicBody').then((module) => module.default));
const CommentSection = dynamic(() => import('@/components/CommentSection').then((module) => module.default));
const ShareDialog = dynamic(() => import('@/components/ShareDialog').then((module) => module.default));
const Toast = dynamic(() => import('@/components/Toast').then((module) => module.default));

interface topicPageProps {
  params: {
    id: string;
  };
}

export default function TopicPage({ params }: topicPageProps) {
  const { isDark, showShareDialog }: { isDark: boolean; showShareDialog: boolean } = useSelector(
    (state: RootState) => state.mainReducer,
  );
  const dispatch = useDispatch();
  const pathname = usePathname() || '';

  const onDialogShowHandler = useCallback(() => {
    dispatch(setShowShareDialog(false));
  }, []);

  return (
    <main className={classNames(styles.main, isDark && styles.dark)}>
      {isDark && (
        <Image
          src="/images/darkBackgroundBubble.png"
          alt="top bubble"
          width={500}
          height={500}
          className={styles.leftBubble}
        />
      )}

      {isDark && (
        <Image
          src="/images/darkBackgroundBubble.png"
          alt="top bubble"
          width={500}
          height={500}
          className={styles.rightBubble}
        />
      )}
      <TopicBody id={params.id} />
      <CommentSection />
      <ShareDialog url={pathname} show={showShareDialog} onHide={onDialogShowHandler} />
      <Toast />
    </main>
  );
}
