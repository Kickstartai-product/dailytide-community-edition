'use client';

import { memo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import BounceLoader from 'react-spinners/BounceLoader';
import styles from './index.module.scss';
import { getTopics } from '@/endpoints';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import type { ITopic } from '@/interfaces/topics';
import { normalizeDate, getYesterday } from '@/utils';
import { useDispatch } from 'react-redux';
import { setIsQueryStringChanged } from '@/redux/reducers/mainReducer';
import { useSearchParams } from 'next/navigation';
import { useUserSession } from '@/hooks';

const TopicPreview = dynamic(() => import('@/components/TopicPreview'), { ssr: false });
const Button = dynamic(() => import('@/components/Button').then((module) => module.default), { ssr: false });
const TopicDateHeader = dynamic(() => import('@/components/TopicDateHeader').then((module) => module.default), {
  ssr: false,
});

type TopicListProps = {
  selectedDate?: Date;
  category?: string;
};

type Header = {
  topicsCount: number;
  date: string;
};

type TopicsList = {
  topics: ITopic[];
  header: Header;
};

const TopicsList = ({ selectedDate }: TopicListProps): JSX.Element => {
  const { isDark, isQueryStringChanged }: { isDark: boolean; isQueryStringChanged: boolean } = useSelector(
    (state: RootState) => state.mainReducer,
  );

  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const [date, setDate] = useState(selectedDate || getYesterday());
  const [topics, setTopics] = useState<TopicsList[]>();
  const { session } = useUserSession();

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  const { data, isError, isFetching } = useQuery({
    queryKey: ['topics', normalizeDate(date), searchParams?.get('category') || ''],
    queryFn: () => getTopics(normalizeDate(date), session?.user?.id || '', searchParams?.get('category') || ''),
    keepPreviousData: true,
    onSuccess: (newTopics) => {
      const newTopicsList = {
        topics: newTopics,
        header: {
          topicsCount: newTopics.length,
          date: normalizeDate(date),
        },
      };
      setTopics(
        !selectedDate && !isQueryStringChanged
          ? (prevTopics: TopicsList[] | undefined) => [...(prevTopics || []), newTopicsList]
          : [newTopicsList],
      );
      dispatch(setIsQueryStringChanged(false));
    },
    refetchOnWindowFocus: false,
  });

  const handleLoadMore = () => {
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  return (
    <div className={styles.topicsListContainer}>
      {isFetching && !data ? (
        <div className={styles.loadingCanvas}>
          {/* TODO: Color should be in styles/color */}
          <BounceLoader color="#4033fd" speedMultiplier={1.2} className={styles.loadingSpinner} />
        </div>
      ) : (
        <div className={styles.topicsList}>
          {topics &&
            topics.map((topicList: TopicsList, index: number) => (
              <div key={index}>
                <TopicDateHeader topicsCount={topicList.topics.length} date={topicList.header.date} />
                {topicList.topics.map((topic: ITopic) => (
                  <TopicPreview key={topic._id} topic={topic} />
                ))}
              </div>
            ))}

          <div className={classNames(styles.showMoreContainer, { [styles.dark]: isDark })}>
            {/* TODO: Color should be in styles/color */}

            {!selectedDate ? (
              isFetching ? (
                <BounceLoader color="#4033fd" speedMultiplier={1.2} />
              ) : (
                <Button
                  text="Show More"
                  style={styles.showMoreButton}
                  onClick={handleLoadMore}
                  disabled={isFetching || isError}
                />
              )
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(TopicsList);
