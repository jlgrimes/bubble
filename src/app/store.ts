import { configureStore, Action } from '@reduxjs/toolkit';
import tournamentReducer from '../features/Tournament/state/tournamentSlice';
import { ThunkAction } from 'redux-thunk';

const store = configureStore({
  reducer: {
    tournament: tournamentReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;