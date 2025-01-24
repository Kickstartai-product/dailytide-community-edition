'use client';

import { Suspense, useState } from 'react';
import type { RootState } from '@/redux/store';
import styles from './page.module.scss';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import {
  setShowShareDialog,
  setQueryString,
  setIsQueryStringChanged,
  setShowFilterModal,
} from '@/redux/reducers/mainReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { normalizeDate } from '@/utils';

const Section = dynamic(() => import('@/components/Section').then((module) => module), { ssr: false });
const TopicsList = dynamic(() => import('@/components/TopicsList').then((module) => module), { ssr: false });
const ShareDialog = dynamic(() => import('@/components/ShareDialog').then((module) => module), { ssr: false });
const FilterBar = dynamic(() => import('@/components/FilterBar').then((module) => module), { ssr: false });
const FilterModal = dynamic(() => import('@/components/FilterModal').then((module) => module), { ssr: false });
const DatePicker = dynamic(() => import('@/components/CustomDatePicker').then((module) => module), { ssr: false });
const Toast = dynamic(() => import('@/components/Toast').then((module) => module), { ssr: false });

export default function Home(): JSX.Element {
  const {
    isDark,
    shareTopicId,
    showShareDialog,
    queryString,
  }: { isDark: boolean; shareTopicId: string; showShareDialog: boolean; queryString: URLSearchParams } = useSelector(
    (state: RootState) => state.mainReducer,
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [date, setDate] = useState<Date | undefined>(
    new URLSearchParams(searchParams || '').get('date')
      ? new Date(searchParams ? (searchParams.get('date') as string) : '')
      : undefined,
  );

  const onDateChange = (date?: Date | null) => {
    if (!date) {
      queryString.delete('date');
      dispatch(setQueryString(queryString));
      dispatch(setIsQueryStringChanged(true));
    } else {
      const dateParam = normalizeDate(date);
      queryString.set('date', dateParam);
      dispatch(setQueryString(queryString));
      dispatch(setIsQueryStringChanged(true));
      // sendGTMEvent('date_change', { date: dateParam });
    }
  };

  const onFilterSave = () => {
    dispatch(setIsQueryStringChanged(false));
    setDate(new Date(queryString.get('date') as string));
    // sendGTMEvent('filter_save', { page: 'home' });
    router.push(`${pathName}${queryString ? `?${queryString}` : ''}`);
  };

  const clearLocalQueryString = () => {
    dispatch(setShowFilterModal(false));
    dispatch(setIsQueryStringChanged(false));
    dispatch(setQueryString(new URLSearchParams(searchParams || '')));
  };

  return (
    <main className={classNames(styles.main, isDark && styles.dark)}>
      <Suspense fallback={<Section style={styles.loadingCanvas}></Section>}>
        <FilterBar />
        <Section style={styles.topicContainer}>
          <TopicsList selectedDate={date} />
        </Section>
        <ShareDialog
          url={`/topic/${shareTopicId}`}
          show={showShareDialog}
          onHide={() => dispatch(setShowShareDialog(false))}
        />
        <FilterModal onSave={() => onFilterSave()} onHide={() => clearLocalQueryString()}>
          <DatePicker date={date} onDateChange={onDateChange} />
        </FilterModal>
        <Toast />
      </Suspense>
    </main>
  );
}
