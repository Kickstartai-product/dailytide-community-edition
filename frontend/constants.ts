const PAGE_SIZE = 10;
const REPLY_PAGE_SIZE = 3;
const TOPICS_API_V1 = '/api/v1/topics';
const TOPIC_BY_ID_API_V1 = '/api/v1/topics/topic';
const TOPIC_COMMENTS_API_V1 = '/api/v1/comments';
const TOPIC_VOTES_API_V1 = '/api/v1/votes';
const TOPIC_VOTE_API_V1 = '/api/v1/votes/vote';
const TOPIC_REPLIES_API_V1 = '/api/v1/replies';
const CATEGORIES_API_V1 = '/api/v1/categories';
const CATEGORY_API_V1 = '/api/v1/categories/category';
const USER_API_V1 = '/api/v1/users';
const USER_PROFILE_API_V1 = '/api/v1/users/profile';
const USER_AUTH_API_V1 = '/api/v1/auth';

const TopicSources = {
  twitter: 'twitter',
  x: 'X',
  arxiv: 'ArXiv',
  reddit: 'Reddit',
  hackernews: 'Hackernews',
  news: 'News',
};

const FavIconData = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/images/fav/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/images/fav/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/images/fav/android-chrome-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '512x512',
    href: '/images/fav/android-chrome-512x512.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/images/fav/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/images/fav/site.webmanifest' },
  {
    rel: 'mask-icon',
    href: '/images/fav/safari-pinned-tab.svg',
    color: '#5bbad5',
  },
];

const TimePeriodOptions = { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', yearly: 'Yearly' };
const emailWhiteList = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Messages
const FAILED = 'Failed';
const UNKNOWN_ACCOUNT = 'UNKNOWN ACCOUNT';
const VOTE_LOGIN_WARNING = 'Please login to vote';

const SOURCES_MINIMUM_LIMIT = 2;

export {
  PAGE_SIZE,
  REPLY_PAGE_SIZE,
  TOPICS_API_V1,
  FavIconData,
  TimePeriodOptions,
  emailWhiteList,
  TopicSources,
  FAILED,
  TOPIC_BY_ID_API_V1,
  TOPIC_COMMENTS_API_V1,
  TOPIC_VOTES_API_V1,
  TOPIC_VOTE_API_V1,
  TOPIC_REPLIES_API_V1,
  CATEGORIES_API_V1,
  CATEGORY_API_V1,
  USER_API_V1,
  USER_AUTH_API_V1,
  USER_PROFILE_API_V1,
  UNKNOWN_ACCOUNT,
  VOTE_LOGIN_WARNING,
  SOURCES_MINIMUM_LIMIT,
};
