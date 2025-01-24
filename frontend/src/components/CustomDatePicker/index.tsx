'use client';

import { memo, useEffect, useState } from 'react';
import styles from './index.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { getYearAgo, getMonthAgo, getWeekAgo, getYesterday } from '@/utils';
import { TimePeriodOptions } from '@root/constants';
import DatePicker from 'react-datepicker';

type CustomDatePickerProps = {
  style?: React.CSSProperties;
  onDateChange: (date: Date | null) => void;
  date?: Date;
  period?: string;
};

const CustomDatePicker = ({ onDateChange, date, period }: CustomDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(date || getYesterday());

  useEffect(() => {
    if (!date) {
      onDateChangeHandler(getYesterday());
      return;
    }
    onDateChangeHandler(date);
  }, [period]);

  const onDateChangeHandler = (date: Date) => {
    if (period === TimePeriodOptions.yearly) {
      setStartDate(getYearAgo(date));
      setEndDate(date);
    } else if (period === TimePeriodOptions.weekly) {
      setStartDate(getWeekAgo(date));
      setEndDate(date);
    } else if (period === TimePeriodOptions.monthly) {
      setStartDate(getMonthAgo(date));
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(date);
    }
  };

  const onDateSelected = (date: Date) => {
    if (!date) return;
    onDateChangeHandler(date);
    onDateChange(date);
  };

  return (
    <div className={styles.datePicker}>
      <DatePicker
        closeOnScroll={true}
        selected={date ? date : getYesterday()}
        startDate={startDate}
        endDate={endDate}
        onChange={(date: any) => onDateSelected(date)}
        maxDate={getYesterday()}
        inline
        excludeDates={[new Date()]}
      />
    </div>
  );
};

export default memo(CustomDatePicker);
