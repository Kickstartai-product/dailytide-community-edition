'use client';

import { memo } from 'react';
import { Title, VotesIndicator, ArticleSources, SeparatorDot } from '@/components';
import { getTopicsById } from '@/endpoints';
import { useQuery } from '@tanstack/react-query';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import classNames from 'classnames';
import { TTopicCategory } from '@/interfaces/topics';
import { getCategoryColor } from '@/utils';
import { useUserSession } from '@/hooks';
import { formatSummary } from '@/utils/topic';

type TopicBodyProps = {
  id: string;
};

const TopicBody = ({ id }: TopicBodyProps) => {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);
  const { session } = useUserSession();

  const { data, isFetching, isError } = useQuery({
    queryKey: ['topicById', id],
    queryFn: () => getTopicsById(id, session?.user?.id || ''),
    refetchOnWindowFocus: false,
  });

  if (!data || isError) return null;


  return (
    <>
      {!isFetching ? (
        <div className={styles.contentContainer}>
          {/* Header Section */}
          <div className={styles.headerSection}>
            <VotesIndicator
              id={id}
              userVote={data?.userVote[0]?.length > 0 && data.userVote[0][0]} // This should be fixed in api
              voteCount={data.voteCount}
              style={classNames(styles.voteIndicator, isDark && styles.dark)}
            />
            <SeparatorDot />
            <Title
              tagType="h3"
              style={classNames(
                styles.category,
                isDark && styles.dark,
                data.categories && styles[getCategoryColor(data.categories[0]?.name)],
              )}
            >
              {data.categories && data.categories.map((category: TTopicCategory) => category.name).join(', ')}
            </Title>
          </div>

          {/* Body Section */}
          <div className={styles.bodySection}>
            <Title tagType="h1" style={classNames(styles.title, isDark && styles.dark)}>
              {data.title}
            </Title>
            <span className={classNames(styles.description, isDark && styles.dark)}>{formatSummary(data.description)}</span>
            <p className={classNames(styles.body, isDark && styles.dark)}></p>
            <ArticleSources sources={data.reference_links} isDark={isDark} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default memo(TopicBody);
