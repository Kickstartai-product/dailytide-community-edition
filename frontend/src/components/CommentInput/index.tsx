'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import classNames from 'classnames';
import { sendComment, sendReply } from '@/endpoints';
import type { TUser } from '@/interfaces';
import { useUserSession } from '@/hooks';

const Input = dynamic(() => import('@/components/Input').then((module) => module.default));
const Button = dynamic(() => import('@/components/Button').then((module) => module.default));

type CommentSectionProps = {
  style?: string;
  rows?: number;
  topicId: string;
  commentId?: string;
  show: boolean;
  commentType: 'comment' | 'reply';
  setShowCommentInput?: (value: boolean) => void;
  refetch: () => void;
};

const CommentInput = ({
  topicId,
  commentId,
  style,
  rows = 5,
  show,
  setShowCommentInput,
  refetch,
  commentType,
}: CommentSectionProps) => {
  const { isDark }: { isDark: boolean; user: TUser } = useSelector((state: RootState) => state.mainReducer);
  const [comment, setComment] = useState<string>('');
  const { session, status } = useUserSession();

  const handleReply = (value: string) => {
    setComment(value);
  };

  const sendCommentHandler = async () => {
    if (status === 'unauthenticated' || !session?.user) return;
    if (session?.user?.id === undefined || !session?.user?.token) return;

    let result;
    if (commentType === 'comment') {
      result = await sendComment(comment, session?.user.id, topicId, session?.user.token);
    } else {
      if (!commentId) return;
      result = await sendReply(comment, session?.user.id, topicId, commentId, session?.user.token);
    }
    setShowCommentInput && setShowCommentInput(false);
    setComment('');
    refetch();
  };

  if (!show) return null;

  return (
    <div className={classNames(styles.commentSectionContainer, style)}>
      <Input
        placeholder="Write your comment here"
        handleChange={handleReply}
        value={comment}
        type="textarea"
        rows={rows}
        className={styles.commentInput}
      />
      <div className={styles.commentActionBar}>
        <Button
          text="Send"
          style={classNames(styles.submitButton, isDark && styles.dark)}
          onClick={() => {
            sendCommentHandler();
          }}
        />
      </div>
    </div>
  );
};

export default CommentInput;
