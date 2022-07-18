import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { Epic } from 'redux-observable';
import rootReducer from "../slices";
import { epicMiddleware, rootEpic } from "../epics";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), epicMiddleware],
});

epicMiddleware.run(rootEpic)

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppEpic = Epic<AnyAction, AnyAction, AppState>