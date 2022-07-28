import { combineReducers } from 'redux'
import tournamentReducer from '../features/Tournament/state/tournamentSlice';

 const rootReducer = combineReducers({
   tournament: tournamentReducer
 })

 export default rootReducer;