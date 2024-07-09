"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "../reducers/products";
import selectProductReducer from "../reducers/selectProduct";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { useDispatch } from "react-redux";
import designCardOpenReducer from "../reducers/designCardOpen";
import filterCardReducer from "../reducers/filterCardOpen";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  product: productsReducer,
  design: designCardOpenReducer,
  select: selectProductReducer,
  filter: filterCardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/REGISTER'
        ],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
