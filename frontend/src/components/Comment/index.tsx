import { useState } from 'react';
import styles from './index.module.scss';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faFlag } from '@fortawesome/free-regular-svg-icons';
import { REPLY_PAGE_SIZE, UNKNOWN_ACCOUNT } from '@root/constants';
import { Divider, SeparatorDot } from '@/components';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useUserSession } from '@/hooks';
import { toast } from 'react-toastify';
import { VOTE_LOGIN_WARNING } from '@root/constants';

const VoteIndicator = dynamic(() => import('@/components/VotesIndicator').then((module) => module), { ssr: false });
const Reply = dynamic(() => import('@/components/Reply').then((module) => module), { ssr: false });
const CommentInput = dynamic(() => import('@/components/CommentInput').then((module) => module.default));

type CommentProps = {
  isDark: boolean;
  comment: {
    _id: string;
    user: {
      name: string;
      username: string;
    };
    content: string;
    updated: string;
    replies?: any[];
    voteCount: number;
    votes: [
      {
        topicId: string;
        votes: [
          {
            _id: string;
            userId: string;
            vote: string;
          },
        ];
      },
    ];
  };
  topicId: string;
  refetch: () => void;
};

const Comment = ({ comment, topicId, isDark, refetch }: CommentProps) => {
  const [replyPage, setReplyPage] = useState<number>(1);
  const [openReply, setOpenReply] = useState<boolean>(false);

  const { session } = useUserSession();

  const setOpenReplyHandler = () => {
    if (!session?.user) {
      toast.warn(VOTE_LOGIN_WARNING);
      return;
    }

    setOpenReply(!openReply);
  };

  return (
    <div className={styles.commentContainer}>
      <Divider />
      <div className={styles.commentNav}>
        <div className={classNames(styles.commentUser, isDark && styles.dark)}>
          {comment.user.username || UNKNOWN_ACCOUNT}
        </div>
        <SeparatorDot />
        <div className={classNames(styles.commentTime, isDark && styles.dark)}>
          {formatDistanceToNow(new Date(comment.updated))} ago
        </div>
      </div>
      <div className={classNames(styles.commentBody, isDark && styles.dark)}>{comment.content}</div>
      <div className={styles.commentActionBar}>
        <VoteIndicator id={comment._id} userVote={comment?.votes[0]?.votes[0]} voteCount={comment.voteCount} />
        <SeparatorDot />
        <div className={classNames(styles.commentAction, isDark && styles.dark)} onClick={() => setOpenReplyHandler()}>
          <FontAwesomeIcon icon={faComment as IconDefinition} /> Reply
        </div>
        <SeparatorDot />
        <div className={classNames(styles.commentAction, isDark && styles.dark)}>
          <FontAwesomeIcon icon={faFlag as IconDefinition} /> Report
        </div>
      </div>
      <CommentInput
        rows={3}
        topicId={topicId}
        commentId={comment._id}
        show={openReply}
        setShowCommentInput={(value: boolean) => setOpenReply(value)}
        refetch={() => refetch()}
        commentType="reply"
      />
      {comment.replies &&
        comment.replies.length > 0 &&
        comment.replies
          .slice(0, replyPage * REPLY_PAGE_SIZE)
          .map((reply: any, index: number) => <Reply key={index} reply={reply} isDark={isDark} />)}
      <div className={styles.loadMore} onClick={() => setReplyPage(replyPage + 1)}>
        See More
      </div>
    </div>
  );
};

export default Comment;
