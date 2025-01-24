import { formatSummary } from './topic';
import { TopicSources } from '@root/constants';

const getYear = (): string => {
  return new Date().getFullYear().toString();
};

const insertInArray = <T>(prevItems: T[], newItems: T[], pageNumber: number, pageSize: number): T[] => {
  const newArray = [...prevItems];
  const startIndex = (pageNumber - 1) * pageSize;

  for (let i = 0; i < newItems.length; i++) {
    const index = startIndex + i;
    if (index >= 0) {
      newArray[index] = newItems[i];
    }
  }

  return newArray;
};

const getMonthAgo = (date: Date): Date => {
  const currentTime = date.getTime();
  const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
  return new Date(currentTime - thirtyDaysInMilliseconds);
};

const getYearAgo = (date: Date): Date => {
  const currentTime = date.getTime();
  const sevenDaysInMilliseconds = 365 * 24 * 60 * 60 * 1000;
  return new Date(currentTime - sevenDaysInMilliseconds);
};

const getWeekAgo = (date: Date): Date => {
  const currentTime = date.getTime();
  const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  return new Date(currentTime - sevenDaysInMilliseconds);
};

const normalizeDate = (date: Date): string => {
  return date.toISOString().substring(0, 10);
};

const headerDateConvertor = (date: string): string => {
  const dateObj = new Date(date);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthNames[dateObj.getMonth()] + ' ' + dateObj.getDate();
};

const getSource = (source: string): string => {
  switch (source.toLowerCase()) {
    case TopicSources.twitter.toLowerCase():
      return 'X';
    case TopicSources.x.toLowerCase():
      return 'X';
    case TopicSources.arxiv.toLowerCase():
      return 'ArXiv';
    case TopicSources.reddit.toLowerCase():
      return 'Reddit';
    case TopicSources.hackernews.toLowerCase():
      return 'Hackernews';
    case TopicSources.news.toLowerCase():
      return 'News';
    default:
      return '';
  }
};

const getYesterday = (): Date => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - 1));
};

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Technology and Research':
      return 'tech';
    case 'Business':
      return 'business';
    case 'Governance':
      return 'governance';
    case 'The Netherlands':
      return 'netherlands';
    case 'Tools and Applications':
      return 'tools';
    default:
      return '';
  }
};

const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const equalPosition = cookie.indexOf('=');
    const name = equalPosition > -1 ? cookie.substr(0, equalPosition) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

export {
  getYear,
  insertInArray,
  getMonthAgo,
  getYearAgo,
  getWeekAgo,
  getSource,
  normalizeDate,
  headerDateConvertor,
  getYesterday,
  getCategoryColor,
  deleteAllCookies,
  formatSummary,
};
