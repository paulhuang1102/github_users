import { combineReducers } from '@reduxjs/toolkit';
import githubReducer from './github';

const rootReducer = combineReducers({
  github: githubReducer,
});

export default rootReducer;