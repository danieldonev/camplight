import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from '../types/country';

interface FavoriteCountry extends Country {
  note: string;
}

interface CountriesState {
  favorites: Record<string, FavoriteCountry>;
}

const initialState: CountriesState = {
  favorites: {},
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<{ country: Country; note: string }>) => {
      const { country, note } = action.payload;
      state.favorites[country.ccn3] = { ...country, note };
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      delete state.favorites[action.payload];
    },
  },
});

export const { addFavorite, removeFavorite } = countriesSlice.actions;
export default countriesSlice.reducer;
