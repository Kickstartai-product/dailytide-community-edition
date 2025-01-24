type TUser = {
  _id: string;
  name?: string;
  username?: string;
  email: string;
  userPorfilePic?: string;
  userAuthToken?: string;
  profilePic?: string;
  summary?: string;
};

type TUserSession = {
  user: { email: string; id: string; image: string; name: string; token: string };
};

type TSession = {
  session: TUserSession | null;
  status: 'authenticated' | 'unauthenticated' | 'loading';
};

export type { TUser, TSession };
