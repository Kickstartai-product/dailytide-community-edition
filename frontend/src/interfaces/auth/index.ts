import { IconProp } from '@fortawesome/fontawesome-svg-core';

type TProvider = {
  id: string;
  name: string;
  icon: IconProp | string;
};

type TSignUpData = {
  email: string;
  username: string;
  password: string;
};

type TLoginData = Omit<TSignUpData, 'username'>;

export type { TProvider, TSignUpData, TLoginData };
