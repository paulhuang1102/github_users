import { AnyAction } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable'; 
import { RootState } from '../slices';
import githubEpic from './github';

export const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();
export const rootEpic = combineEpics(...githubEpic);