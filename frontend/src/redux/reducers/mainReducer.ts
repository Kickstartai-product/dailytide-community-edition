import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { TUser, TModal } from '@/interfaces';

type TMainState = {
  loading: boolean;
  showFilterModal: boolean;
  showProfileEditModal: boolean;
  currentModal: TModal;
  queryString: URLSearchParams;
  isQueryStringChanged: boolean;
  isDark: boolean;
  showShareDialog: boolean;
  user: TUser;
  shareTopicId: string;
};

const initialState: TMainState = {
  loading: false,
  showFilterModal: false,
  showProfileEditModal: false,
  currentModal: undefined,
  queryString: new URLSearchParams(),
  isQueryStringChanged: false,
  isDark: false,
  showShareDialog: false,
  shareTopicId: '',
  user: {
    _id: '',
    name: '',
    username: '',
    email: '',
    profilePic: '',
    userPorfilePic: '',
    userAuthToken: '',
  },
};

const mainSlice = createSlice({
  name: 'topics',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    setShowFilterModal: (state, action: PayloadAction<boolean>) => {
      return { ...state, showFilterModal: action.payload };
    },
    setCurrentModal: (state, action: PayloadAction<TModal>) => {
      return { ...state, currentModal: action.payload };
    },
    setShowProfileEditModal: (state, action: PayloadAction<boolean>) => {
      return { ...state, showProfileEditModal: action.payload };
    },
    setQueryString: (state, action: PayloadAction<URLSearchParams>) => {
      return { ...state, queryString: action.payload };
    },
    setIsQueryStringChanged: (state, action: PayloadAction<boolean>) => {
      return { ...state, isQueryStringChanged: action.payload };
    },
    setUserDetails: (state, action: PayloadAction<TMainState['user']>) => {
      return { ...state, user: { ...state.user, ...action.payload } };
    },
    removeUserDetails: (state) => {
      return {
        ...state,
        user: {
          _id: '',
          name: '',
          username: '',
          email: '',
          profilePic: '',
          userPorfilePic: '',
          userAuthToken: '',
        },
      };
    },
    setShowShareDialog: (state, action: PayloadAction<boolean>) => {
      return { ...state, showShareDialog: action.payload };
    },
    setShareTopicId: (state, action: PayloadAction<string>) => {
      return { ...state, shareTopicId: action.payload };
    },
    toggleTheme: (state) => {
      return { ...state, isDark: !state.isDark };
    },
  },
});
export const {
  setLoading,
  setShowFilterModal,
  setCurrentModal,
  setQueryString,
  setIsQueryStringChanged,
  setUserDetails,
  toggleTheme,
  setShowShareDialog,
  setShareTopicId,
  setShowProfileEditModal,
  removeUserDetails,
} = mainSlice.actions;
export default mainSlice.reducer;
