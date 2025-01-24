export type ITwitterUser = {
  id: string;
  name: string;
  profile_image_url?: string;
  screen_name?: string;
  location?: string;
  description?: string;
  url?: string;
  entities?: {
    url: {
      urls: {
        url: string;
        expanded_url: string;
        display_url: string;
        indices: number[];
      }[];
    };
  };
  protected?: boolean;
  followers_count?: number;
  friends_count?: number;
  listed_count?: number;
  created_at?: string;
  favourites_count?: number;
  utc_offset?: number;
  time_zone?: string;
  geo_enabled?: boolean;
  verified?: boolean;
  statuses_count?: number;
  lang?: string;
  contributors_enabled?: boolean;
};
