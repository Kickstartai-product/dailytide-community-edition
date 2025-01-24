import Image from 'next/image';
import styles from './index.module.scss';
import { headerDateConvertor } from '@/utils';

type DateIndicatorProps = {
  date: string;
  topicCount: number;
};

const DateIndicator = ({ date, topicCount }: DateIndicatorProps) => {
  return (
    <div className={styles.dateContainer}>
      <Image src="/icons/tide.svg" alt="tide icon" width={20} height={20} />
      <span className={styles.tide}>Tide of</span>
      <div className={styles.dateIndicator}>{headerDateConvertor(date)}</div>
      <div className={styles.articleNumber}>{topicCount} Topics</div>
    </div>
  );
};

export default DateIndicator;
