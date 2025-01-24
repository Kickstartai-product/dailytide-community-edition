// twitter interfaces
import type { ITwitterUser } from './twitter/users';
import type { ITweet } from './twitter/tweets';

// reddit interfaces
import type { IRedditPost } from './reddit/posts';
import type { IRedditUser } from './reddit/users';

// topic interfaces
import type { IArticle, ITopic, TReferenceLinks } from './topics';

// User interfaces
import type { TUser, TSession } from './users';

import type { TProvider, TSignUpData, TLoginData } from './auth';

import type { TModal } from './modals';

export type {
  // twitter
  ITwitterUser,
  ITweet,

  // reddit
  IRedditPost,
  IRedditUser,

  // topics
  IArticle,
  ITopic,
  TReferenceLinks,
  TUser,

  // auth
  TProvider,
  TSession,

  // modals
  TModal,

  // users
  TSignUpData,
  TLoginData,
};
