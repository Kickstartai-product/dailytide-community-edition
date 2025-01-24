'use client';

import dynamic from 'next/dynamic';
import { faPlus, faShare } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setShowShareDialog } from '@/redux/reducers/mainReducer';

const Button = dynamic(() => import('@/components/Button').then((module) => module.default));

type CommentBarProps = {
  style?: string;
  isDark: boolean;
  showComment: boolean;
  showShare: boolean;
  showCommentInput?: () => void;
};

const CommentBar = ({ style, isDark, showComment, showShare, showCommentInput }: CommentBarProps): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div className={classNames(styles.commentBarContainer, style)}>
      {showComment && (
        <Button
          text="Add a Comment"
          icon={faPlus}
          outline
          isDark={isDark}
          style={styles.commentBarActionButton}
          onClick={showCommentInput}
        ></Button>
      )}
      {showShare && (
        <Button
          text="Share"
          icon={faShare}
          outline
          isDark={isDark}
          style={styles.commentBarActionButton}
          onClick={() => dispatch(setShowShareDialog(true))}
        ></Button>
      )}
    </div>
  );
};

export default CommentBar;
