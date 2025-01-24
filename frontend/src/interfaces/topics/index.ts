type IArticle = {
  _id: string;
  title: string;
  summary: string;
  source_link: string;
  source: string;
  created: string;
};

type TReferenceLinks = {
  _id: string;
  title: string;
  link: string;
  source_name: string;
};

type TTopicCategory = {
  _id: string;
  name: string;
};

type TUserVote = {
  _id: string;
  userId: string;
  vote: string;
};

type ITopic = {
  _id: string;
  categories?: TTopicCategory[];
  title: string;
  summary: string;
  popularity: number;
  description?: string;
  reference_links: TReferenceLinks[];
  userVote?: TUserVote[][];
  voteCount?: number;
  commentCount?: number;
};

type TTopicsResponseData = {
  _id: string;
  end_time: string;
  popularity: number;
  reference_links: TReferenceLinks[];
  start_time: string;
  summary: string;
  title: string;
};

type TVoteData = {
  upvotes: number;
  downvotes: number;
  isDisabled: boolean;
};

type TCommentData = {
  count: number;
  isDisabled: boolean;
};

export type {
  IArticle,
  TReferenceLinks,
  ITopic,
  TTopicCategory,
  TTopicsResponseData,
  TVoteData,
  TCommentData,
  TUserVote,
};
