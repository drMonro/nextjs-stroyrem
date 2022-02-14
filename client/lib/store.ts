import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {apiReducer} from '../store/api-reducer';

export const makeStore = () =>
  configureStore({
    reducer: {
      // appReducer,
      // offersReducer,
      [apiReducer.reducerPath]: apiReducer.reducer,
    },
    middleware: (gDM) => gDM({
      thunk: {
        extraArgument: apiReducer,
      }}).concat(apiReducer.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const reduxWrapper = createWrapper<AppStore>(makeStore, { debug: true });
