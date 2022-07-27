import { combineReducers } from 'redux'
import { withReduxStateSync } from 'redux-state-sync'
import tournamentReducer from '../features/Tournament/state/tournamentSlice';

 const rootReducer = combineReducers({
   tournament: tournamentReducer
 })

 export default withReduxStateSync(rootReducer);