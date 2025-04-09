import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from './userData';
import replyReducer from './replySlice';

export const store = configureStore({
  reducer: {
    userDataSlice: userDataReducer,
    replySlice: replyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
