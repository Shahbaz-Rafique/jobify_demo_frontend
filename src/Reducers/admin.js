import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../Redux/AdminSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

export default store;
