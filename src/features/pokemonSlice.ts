import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PokemonState {
  pokemonList: { name: string; url: string }[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  offset: number;
}

export type Pokemon = {
  name: string;
  url: string;
};

const initialState: PokemonState = {
  pokemonList: [],
  loading: false,
  loadingMore: false,
  error: null,
  offset: 0,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialState,
  reducers: {
    getPokemonFetch: (state) => {
      state.loading = true;
    },
    getMorePokemonFetch: (state) => {
      state.loadingMore = true;
    },
    getPokemonSuccess: (state, action) => {
      state.pokemonList = action.payload;
      state.loading = false;
      state.offset = 10;
    },
    getMorePokemonSuccess: (state, action) => {
      state.pokemonList = [...state.pokemonList, ...action.payload];
      state.loadingMore = false;
      state.offset += 10;
    },
    getPokemonFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.loadingMore = false;
      state.error = action.payload;
    },
  },
});
export const {
  getPokemonFetch,
  getMorePokemonFetch,
  getPokemonSuccess,
  getMorePokemonSuccess,
  getPokemonFailure,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
