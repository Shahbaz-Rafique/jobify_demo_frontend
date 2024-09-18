import { combineReducers } from 'redux';
import jobReducer from '../Redux/JobSlice'; 

const rootReducer = combineReducers({
  jobs: jobReducer, 
});

export default rootReducer;
