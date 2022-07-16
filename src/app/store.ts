import { configureStore, Action, PreloadedState } from '@reduxjs/toolkit';
import tournamentReducer from '../features/Tournament/state/tournamentSlice';
import { ThunkAction } from 'redux-thunk';

const store = configureStore({
  reducer: {
    tournament: tournamentReducer,
  },
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      tournament: tournamentReducer,
    },
    preloadedState
  })
}

export default setupStore();

export type AppStore = ReturnType<typeof setupStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;