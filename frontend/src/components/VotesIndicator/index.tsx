'use client';

import { MouseEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown as filledThumbsDown, faThumbsUp as filledThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { engagementActions } from '@/data/userEngagement';
import styles from './index.module.scss';
import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { vote } from '@/endpoints';
import type { TUserVote } from '@/interfaces/topics';
import { useUserSession } from '@/hooks';
import { toast } from 'react-toastify';
import { VOTE_LOGIN_WARNING } from '@root/constants';

const Button = dynamic(() => import('@/components/Button').then((module) => module.default), { ssr: false });

export type VoteIndicatorProps = {
  id: string;
  userVote?: TUserVote;
  voteCount?: number;
  style?: string;
};

const VoteIndicator = ({ id, userVote, voteCount, style }: VoteIndicatorProps) => {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);
  const [voted, setVoted] = useState<string>(userVote ? userVote.vote : '');
  const [localVoteCount, setLocalVoteCount] = useState<number>(voteCount || 0);

  const { session: session } = useUserSession();

  const voteHandler = async (voteType: string) => {
    if (!session?.user) {
      toast.warn(VOTE_LOGIN_WARNING);
      return;
    }

    const result = await vote(voteType, session.user.id, id, session?.user?.token);

    if (result) {
      setLocalVoteCount(result.vote.count);
      setVoted(result.userVote);
    }
  };

  const handleUpvote = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    voteHandler(engagementActions.UPVOTE);
  };

  const handleDownvote = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    voteHandler(engagementActions.DOWNVOTE);
  };

  return (
    <div className={classNames(styles.voteIndicatorContainer, style || '')}>
      <Button
        style={classNames(styles.iconButton, isDark && styles.dark)}
        icon={voted === 'up' ? (filledThumbsUp as IconProp) : (faThumbsUp as IconProp)}
        ariaLabel="Upvote"
        onClick={(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          e.preventDefault();
          voteHandler(engagementActions.UPVOTE);
        }}
      />
      {<span className={classNames(styles.voteNumber, isDark && styles.dark)}>{localVoteCount}</span>}{' '}
      <Button
        style={classNames(styles.iconButton, isDark && styles.dark)}
        icon={voted === 'down' ? (filledThumbsDown as IconProp) : (faThumbsDown as IconProp)}
        ariaLabel="Downvote"
        onClick={(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          e.preventDefault();
          voteHandler(engagementActions.DOWNVOTE);
        }}
      />
    </div>
  );
};

export default VoteIndicator;
