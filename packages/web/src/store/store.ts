import { configureStore } from '@reduxjs/toolkit';
import { countriesApi } from '../api/countriesApi';
import countriesReducer from './countriesSlice';
import { loadState, saveState } from './storePersist';
import { rtkQueryErrorLogger } from './errorMiddleware';

const persistedStateKey = 'favoriteCountries';

const persistedFavoriteCountries = loadState(persistedStateKey);

export const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
    countries: countriesReducer,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware).concat(rtkQueryErrorLogger),
  preloadedState: {
    countries: {
      favorites: persistedFavoriteCountries || {},
    },
  },
});

store.subscribe(() => {
  saveState(persistedStateKey, store.getState().countries.favorites);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
