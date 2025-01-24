'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import type { TUserVote } from '@/interfaces/topics';
import styles from './index.module.scss';

const VotesIndicator = dynamic(() => import('@/components/VotesIndicator').then((module) => module.default), {
  ssr: false,
});
const CommentsIndicator = dynamic(() => import('@/components/CommentsIndicator').then((module) => module.default), {
  ssr: false,
});

const ShareIndicator = dynamic(() => import('@/components/ShareIndicator').then((module) => module.default), {
  ssr: false,
});

export type EngagementBarProps = {
  id: string;
  commentsCount?: number;
  userVote?: TUserVote;
  voteCount?: number;
};

const EngagementBar = ({ id, commentsCount, userVote, voteCount = 0 }: EngagementBarProps) => {
  return (
    <div className={styles.engagementIndicatoresContainer}>
      <VotesIndicator id={id} voteCount={voteCount} userVote={userVote} />
      <CommentsIndicator commentsCount={commentsCount} id={id} />
      <ShareIndicator id={id} />
    </div>
  );
};

export default memo(EngagementBar);
