import persistReducer from "redux-persist/es/persistReducer";
import { configureStore } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";
import { storeApi } from "./api";
import rootReducer from "./reducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "gree-commerce-portal",
  storage: createWebStorage("local"),
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(storeApi.middleware),
});

export const persistor = persistStore(store);
export default store;

export const useDispatch = (): ReduxDispatch =>
  useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/** Types */
export type ReduxStore = typeof store;
export type ReduxState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type ReduxDispatch = typeof store.dispatch;
