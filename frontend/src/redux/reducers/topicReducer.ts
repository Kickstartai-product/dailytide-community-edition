import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ITopic } from '@/interfaces';
import { insertInArray } from '@/utils';
import { PAGE_SIZE } from '@root/constants';

const topicSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: [] as ITopic[],
  },
  reducers: {
    setTopics: (
      state,
      action: PayloadAction<{
        pageNumber: number;
        pageSize?: number;
        data: ITopic[];
      }>,
    ) => {
      const newTopicsData = insertInArray(
        state.topics,
        action.payload.data,
        action.payload.pageNumber,
        action.payload.pageSize || PAGE_SIZE,
      );

      return { ...state, topics: newTopicsData };
    },
    flushTopics: (state) => {
      return { ...state, topics: [] };
    },
    removeTopic: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        topics: state.topics.filter(
          (topic: ITopic) => topic._id !== action.payload,
        ),
      };
    },
  },
});
export const { setTopics, flushTopics, removeTopic } = topicSlice.actions;
export default topicSlice.reducer;
