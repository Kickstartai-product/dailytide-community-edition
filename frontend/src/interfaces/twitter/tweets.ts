import type { ITwitterUser } from './users';

export type ITweet = {
  id: string;
  text: string;
  created_at?: string;
  user: ITwitterUser;
  image?: string;
  entities?: {
    hashtags: {
      text: string;
      indices: number[];
    }[];
    urls?: {
      url: string;
      expanded_url: string;
      display_url: string;
      indices: number[];
    }[];
    user_mentions?: {
      screen_name: string;
      name: string;
      id: string;
      id_str: string;
      indices: number[];
    }[];
    symbols?: any[];
  };
  source?: string;
  in_reply_to_status_id?: string;
  in_reply_to_status_id_str?: string;
  in_reply_to_user_id?: string;
  in_reply_to_user_id_str?: string;
  in_reply_to_screen_name?: string;
  geo?: any;
  coordinates?: any;
  place?: any;
  contributors?: any;
  retweeted_status?: ITweet;
  is_quote_status?: boolean;
  retweet_count?: number;
  favorite_count?: number;
  favorited?: boolean;
  retweeted?: boolean;
  lang?: string;
};
