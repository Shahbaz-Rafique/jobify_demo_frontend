import { combineReducers } from 'redux';
import companyReducer from '../Redux/CompanySlice'; 

const rootReducer = combineReducers({
  companies: companyReducer, 
});

export default rootReducer;
