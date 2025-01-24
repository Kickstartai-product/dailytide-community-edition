import styles from './index.module.scss';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import SeparatorDot from '@/components/SeparatorDot';
import { UNKNOWN_ACCOUNT } from '@root/constants';

const VoteIndicator = dynamic(() => import('@/components/VotesIndicator').then((module) => module), { ssr: false });

type ReplyProps = {
  reply: {
    _id: string;
    user: {
      name: string;
      username?: string;
    };
    content: string;
    updated: string;
    votes?: [
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
    voteCount?: number;
  };
  isDark: boolean;
};

const Reply = ({ reply, isDark }: ReplyProps) => {
  if (!reply._id) return null;

  return (
    <div className={styles.replyContainer}>
      <div className={styles.replyNav}>
        <div className={classNames(styles.replyUser, isDark && styles.dark)}>
          {reply.user?.username || UNKNOWN_ACCOUNT}
        </div>
        <SeparatorDot />
        <div className={classNames(styles.replyTime, isDark && styles.dark)}>
          {formatDistanceToNow(new Date(reply.updated))} ago
        </div>
      </div>
      <div className={classNames(styles.replyBody, isDark && styles.dark)}>{reply.content}</div>
      <div className={styles.replyActionBar}>
        <VoteIndicator id={reply._id} userVote={reply.votes?.[0]?.votes?.[0]} voteCount={reply.voteCount} />
        <div className={classNames(styles.replyAction, isDark && styles.dark)}>
          <FontAwesomeIcon icon={faFlag as IconDefinition} /> Report
        </div>
      </div>
    </div>
  );
};

export default Reply;
