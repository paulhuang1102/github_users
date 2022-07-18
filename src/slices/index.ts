import { combineReducers } from '@reduxjs/toolkit';
import githubReducer from './github';

const rootReducer = combineReducers({
  github: githubReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;