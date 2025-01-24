'use client';

import styles from './index.module.scss';
import dynamic from 'next/dynamic';

const DateIndicator = dynamic(() => import('@/components/DateIndicator').then((module) => module.default), {
  ssr: false,
});

type TopicDateHeaderProps = {
  date: string;
  topicsCount: number;
};

const TopicDateHeader = ({ date, topicsCount }: TopicDateHeaderProps) => {
  return (
    <div className={styles.topicDateHeaderContainer}>
      <div className={styles.topidDateHeaderContentContainer}>
        <DateIndicator date={date} topicCount={topicsCount} />
      </div>
    </div>
  );
};

export default TopicDateHeader;
