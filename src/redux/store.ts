import { configureStore } from '@reduxjs/toolkit';
import skillReducer from './slices';
//import scheduleReducer from './slices/scheduleSlice';

const store = configureStore({
  reducer: {
    skills: skillReducer,
    //schedule: scheduleReducer,
  },
});

export default store;
