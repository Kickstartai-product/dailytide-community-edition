'use client';
import { memo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Title from '@/components/Title';
import styles from './index.module.scss';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export type TopicSectionProps = {
  date: string;
  articleAmount: number;
};

const Dropdown = dynamic(() => import('@/components/DropDown').then((module) => module), { ssr: false });
const Button = dynamic(() => import('@/components/Button').then((module) => module), { ssr: false });

// unsure of how default dates and available dates should be handled
const defaultDate = 'today';
const fakeAvailableDates = ['Date', 'Feb 6'];

const TopicSection = ({ date, articleAmount }: TopicSectionProps) => {
  // test functions that should dispatch actions to the store in the future
  const handleDateChange = (date: string) => {};

  // test functions
  const handleFilterClick = () => {
    // eslint-disable-next-line no-console
  };

  return (
    <div className={styles.topicSectionContainer}>
      <div className={styles.sectionContents}>
        <div className={styles.information}>
          <Image src="/images/kai-tide.svg" alt="Tide" width={24} height={24} />
          <Title tagType="h1" emphasis="normal" style={styles.tideTitle}>{`Tide of ${date || defaultDate}`}</Title>
          <span className={styles.divider}></span>
          {articleAmount ? <span className={styles.articleAmount}>{articleAmount} articles</span> : null}
        </div>
        <div className={styles.filters}>
          <Dropdown
            style={styles.dateDropdown}
            options={fakeAvailableDates}
            onChange={(date) => handleDateChange(date)}
          />
          <Button style={styles.filterButton} onClick={() => handleFilterClick()} icon={faFilter} />
        </div>
      </div>
    </div>
  );
};

export default memo(TopicSection);
