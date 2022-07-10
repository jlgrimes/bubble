import { configureStore } from '@reduxjs/toolkit'
import tournamentReducer from '../features/Tournament/tournamentSlice';

export default configureStore({
  reducer: {
    tournament: tournamentReducer
  }
})