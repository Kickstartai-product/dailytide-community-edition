'use client';

import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { setShareTopicId, setShowShareDialog } from '@/redux/reducers/mainReducer';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import type { RootState } from '@/redux/store';

type ShareIndicatorProps = {
  id: string;
};

const ShareIndicator = ({ id }: ShareIndicatorProps) => {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);
  const dispatch = useDispatch();

  const onShareHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(setShareTopicId(id));
    dispatch(setShowShareDialog(true));
  };

  return (
    <div className={styles.shareIndicatorContainer} onClick={onShareHandler}>
      <FontAwesomeIcon icon={faShare} className={classNames(styles.shareIcon, isDark && styles.dark)} />
      <span className={classNames(styles.shareIndicatorText, isDark && styles.dark)}>Share</span>
    </div>
  );
};

export default ShareIndicator;
