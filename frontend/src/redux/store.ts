import { configureStore } from '@reduxjs/toolkit';

// import reducers
import topicReducer from './reducers/topicReducer';
import mainReducer from './reducers/mainReducer';

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    mainReducer,
    topicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
