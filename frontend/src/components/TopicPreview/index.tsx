import { memo } from 'react';
import styles from './index.module.scss';
import { Title } from '@/components';
import type { ITopic } from '@/interfaces/topics';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import classNames from 'classnames';
import { formatSummary } from '@/utils/topic';

const TopicCategory = dynamic(() => import('@/components/TopicCategory').then((module) => module.default), {
  ssr: false,
});

const EngagementBar = dynamic(() => import('@/components/EngagementBar').then((module) => module.default), {
  ssr: false,
});

export type TopicProps = {
  topic: ITopic;
};

const Topic = ({ topic }: TopicProps) => {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);
  if (!topic) return null;

  return (
    <Link href={`/topic/${topic._id}`} className={classNames(styles.topicContent, styles.topicContainer)}>
      <TopicCategory categories={topic.categories} />
      <Title tagType="h2" emphasis="normal" style={classNames(styles.topicTitle, isDark && styles.dark)}>
        {topic.title}
      </Title>
      <p className={classNames(styles.summary, isDark && styles.dark)}>{topic.summary}</p>
      <EngagementBar
        commentsCount={topic.commentCount || 0}
        id={topic._id}
        userVote={topic.userVote && topic.userVote[0] && topic.userVote[0][0]}
        voteCount={topic.voteCount}
      />
    </Link>
  );
};

export default memo(Topic);
