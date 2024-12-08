import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PokemonState {
  pokemonList: PokemonListResponse[];
  loading: boolean;
  error: string | null;
}

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export type Pokemon = {
  name: string;
  url: string;
};

const initialState: PokemonState = {
  pokemonList: [],
  loading: false,
  error: null,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialState,
  reducers: {
    getPokemonFetch: (state) => {
      state.loading = true;
    },
    getPokemonSuccess: (state, action) => {
      state.pokemonList = action.payload;
      state.loading = false;
    },
    getPokemonFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { getPokemonFetch, getPokemonSuccess, getPokemonFailure } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
